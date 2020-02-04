-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings.elm

module Page.Settings exposing (Model, initModel, Msg(..), update, view)

import Common
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Settings.About as About
import Page.Settings.Counters as Counters
import Page.Settings.Crashes as Crashes
import Page.Settings.Functions as Functions
import Page.Settings.Logs as Logs
import Page.Settings.Routes as Routes
import Url
import Url.Parser as UP exposing ((</>))


-- MODEL
type alias Model = 
    { route : Route
    , about : About.Model
    , counters : Counters.Model
    , crashes : Crashes.Model
    , functions : Functions.Model
    , logs : Logs.Model
    , routes : Routes.Model
    }

initModel : Model
initModel =
    { route = NotFound
    , about = About.initModel
    , counters = Counters.initModel
    , crashes = Crashes.initModel
    , functions = Functions.initModel
    , logs = Logs.initModel
    , routes = Routes.initModel
    }


-- ROUTE
type Route
    = NotFound
    | About
    | Counters
    | Crashes
    | Functions
    | Logs String
    | Routes

routeParser : UP.Parser (Route -> a) a
routeParser = 
    UP.oneOf
        [ UP.map About (UP.s "settings" </> UP.s "about")
        , UP.map Counters (UP.s "settings" </> UP.s "counters")
        , UP.map Crashes (UP.s "settings" </> UP.s "crashes")
        , UP.map Functions (UP.s "settings" </> UP.s "functions")
        , UP.map (Logs "") (UP.s "settings" </> UP.s "logs")
        , UP.map Logs (UP.s "settings" </> UP.s "logs" </> UP.string)
        , UP.map Routes (UP.s "settings" </> UP.s "routes")
        ]

getRoute : Common.Flags -> Url.Url -> Route
getRoute flags url = 
    { url | path = String.replace flags.basePath "/" url.path }
        |> UP.parse routeParser
        |> Maybe.withDefault NotFound


-- UPDATE
type Msg
    = ChangedUrl Url.Url
    | GotAboutMsg About.Msg
    | GotCountersMsg Counters.Msg
    | GotCrashesMsg Crashes.Msg
    | GotFunctionsMsg Functions.Msg
    | GotLogsMsg Logs.Msg
    | GotRoutesMsg Routes.Msg

update : Msg -> Model -> Common.Flags -> (Model, Cmd Msg)
update msg model flags =
    case msg of
        ChangedUrl url ->
            changeRoute model flags url
        GotAboutMsg subMsg ->
            Common.updateWith (\a -> { model | about = a }) 
                GotAboutMsg 
                (About.update subMsg model.about flags)
        GotCountersMsg subMsg ->
            Common.updateWith (\a -> { model | counters = a }) 
                GotCountersMsg 
                (Counters.update subMsg model.counters flags)
        GotCrashesMsg subMsg ->
            Common.updateWith (\a -> { model | crashes = a }) 
                GotCrashesMsg 
                (Crashes.update subMsg model.crashes flags)
        GotFunctionsMsg subMsg ->
            Common.updateWith (\a -> { model | functions = a }) 
                GotFunctionsMsg 
                (Functions.update subMsg model.functions flags)
        GotLogsMsg subMsg ->
            Common.updateWith (\a -> { model | logs = a }) 
                GotLogsMsg 
                (Logs.update subMsg model.logs flags)
        GotRoutesMsg subMsg ->
            Common.updateWith (\a -> { model | routes = a }) 
                GotRoutesMsg 
                (Routes.update subMsg model.routes flags)

changeRoute : Model -> Common.Flags -> Url.Url -> (Model, Cmd Msg)
changeRoute model flags url =
    let 
        newModel = { model | route = getRoute flags url }
    in
        case newModel.route of
            About -> 
                update (GotAboutMsg (About.ChangeUrl url)) newModel flags
            Counters -> 
                update (GotCountersMsg (Counters.ChangeUrl url)) 
                    newModel 
                    flags
            Crashes -> 
                update (GotCrashesMsg (Crashes.ChangeUrl url)) 
                    newModel 
                    flags
            Functions ->
                update (GotFunctionsMsg (Functions.ChangeUrl url)) 
                    newModel 
                    flags
            Logs _ ->
                update (GotLogsMsg (Logs.ChangeUrl url)) newModel flags
            Routes ->
                update (GotRoutesMsg (Routes.ChangeUrl url)) newModel flags
            _ -> 
                ( newModel, Cmd.none )


-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    [ div [ class "container-fluid" ]
        [ div [ class "row" ]
            [ div [ class "col-2" ] [ viewSettingsMenu model.route flags ]
            , div [ class "col-10", style "margin-top" "15px" ] 
                (viewSettingsDetail model flags)
            ]
        ]
    ]

viewSettingsMenu : Route -> Common.Flags -> Html msg
viewSettingsMenu route flags =
    nav [ style "position" "sticky" 
        , style "top" "4rem"
        , style "height" "calc(100vh - 4rem)"
        , class "bg-light"
        ]
        [ viewLink "About" (flags.basePath ++ "settings/about")
        , viewLink "Counters" (flags.basePath ++ "settings/counters")
        , viewLink "Crashes" (flags.basePath ++ "settings/crashes")
        , viewLink "Functions" (flags.basePath ++ "settings/functions")
        , viewLink "Logs" (flags.basePath ++ "settings/logs")
        , viewLink "Routes" (flags.basePath ++ "settings/routes")
        ]
    
viewLink : String -> String -> Html msg
viewLink title path =
    div []
        [ a 
            [ href path
            , style "font-size" "x-large" 
            ] 
            [ text title ] 
        ]

viewSettingsDetail : Model -> Common.Flags -> List (Html msg)
viewSettingsDetail model flags =
    case model.route of
        NotFound ->
            []
        About ->
            About.view model.about flags
        Counters ->
            Counters.view model.counters flags
        Crashes ->
            Crashes.view model.crashes flags
        Functions ->
            Functions.view model.functions flags
        Logs a ->
            Logs.view model.logs flags
        Routes ->
            Routes.view model.routes flags

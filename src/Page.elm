-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Main.elm

module Page exposing (Model, initModel, Msg(..), update, view)

import Common
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Settings as Settings
import Url
import Url.Parser as UP exposing ((</>))


-- MODEL
type alias Model =
    { route : Route
    , settings : Settings.Model 
    }

initModel : Model
initModel =
    { route = NotFound
    , settings = Settings.initModel 
    }


-- ROUTE
type Route
    = NotFound
    | SettingsRoute String String
    | GraphRoute

routeParser : UP.Parser (Route -> a) a
routeParser = 
    UP.oneOf
        [ UP.map (SettingsRoute "") (UP.s "settings" </> UP.string)
        , UP.map SettingsRoute (UP.s "settings" </> UP.string </> UP.string)
        , UP.map GraphRoute (UP.s "graph")
        ]

getRoute : Common.Flags -> Url.Url -> Route
getRoute flags url = 
    { url | path = String.replace flags.basePath "/" url.path }
        |> UP.parse routeParser
        |> Maybe.withDefault NotFound


-- UPDATE
type Msg
    = ChangedUrl Url.Url 
    | GotSettingsMsg Settings.Msg

update : Msg -> Model -> Common.Flags -> (Model, Cmd Msg)
update msg model flags =
    case msg of
        ChangedUrl url ->
            changeRoute model flags url
        GotSettingsMsg subMsg ->
            Common.updateWith (\a -> { model | settings = a })
                GotSettingsMsg
                (Settings.update subMsg model.settings flags)

defaultUrl : Common.Flags -> Url.Url
defaultUrl flags =
    { protocol = Url.Http
    , host = ""
    , port_ = Nothing
    , path = flags.basePath ++ "settings/about"
    , query = Nothing
    , fragment = Nothing
    }

changeRoute : Model -> Common.Flags -> Url.Url -> (Model, Cmd Msg)
changeRoute model flags url =
    let 
        newModel = { model | route = getRoute flags url }
    in
    case newModel.route of
        NotFound -> 
            update (ChangedUrl (defaultUrl flags)) model flags
        SettingsRoute a b ->
            update (GotSettingsMsg (Settings.ChangedUrl url)) newModel flags
        GraphRoute ->
            ( newModel, Cmd.none )


-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    viewHeader model.route flags
    ::
    case model.route of
        NotFound ->
            []
        SettingsRoute _ _ ->
            Settings.view model.settings flags
        GraphRoute ->
            []
    
viewHeader : Route -> Common.Flags -> Html msg
viewHeader route flags =
    nav [ class "navbar navbar-expand-lg sticky-top navbar-light bg-light" ]
        [ a [ class "navbar-brand", href "/" ] 
            [ img 
                [ class "d-inline-block align-top"
                , width 30
                , src (flags.basePath ++ "assets/logo.png")
                ] 
                []
            , span
                [ style "color" "red"
                , style "font-size" "x-large"
                , style "font-weight" "bold"
                , style "font-family" "'Arial', serif"
                ]
                [ text " Tismet" ]
            ]
        , button
            [ class "navbar-toggler"
            , type_ "button"
            , attribute "data-toggle" "collapse"
            , attribute "data-target" "#navbarNav"
            , attribute "aria-controls" "navbarNav"
            , attribute "aria-expanded" "false"
            , attribute "aria-label" "Toggle navigation"
            ]
            [ span [ class "navbar-toggler-icon" ] []
            ]
        , div 
            [ class "collapse navbar-collapse"
            , id "navbarNav"
            ]
            [ ul [ class "navbar-nav flex-row" ]
                [ viewLink "Settings" 
                    (flags.basePath ++ "settings") 
                    True
                , viewLink "Graph" 
                    (flags.basePath ++ "graph") 
                    (route == GraphRoute)
                ]
            ]
        , div 
            [ class "collapse navbar-collapse" 
            , id "navbarNav"
            ]
            [ a [ href "http://github.com/gknowles/tismet" 
                , class "ml-md-auto"
                ]
                [ img
                    [ class "d-inline-block align-top"
                    , src (flags.basePath ++ "assets/GitHub-Mark-32px.png")
                    ]
                    []
                ]
            ]
        ]

viewLink : String -> String -> Bool -> Html msg
viewLink title path active =
    li [ class "nav-item", classList [ ("active", active) ] ]
        [ a [ href path, class "nav-link" ] [ text title ] ]

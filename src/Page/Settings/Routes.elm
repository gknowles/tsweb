-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings/Routes.elm

module Page.Settings.Routes exposing (Model, initModel, Msg(..), update, view)

import Common
import FormatNumber
import FormatNumber.Humanize exposing (ZeroStrategy(..))
import FormatNumber.Locales exposing (usLocale)
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import List.Extra
import Url


-- MODEL
type alias RouteInfo =
    { path : String
    , methods : List String
    , matched : Float
    }
type alias Model =
    { now : String
    , routes : List RouteInfo
    }

initModel : Model
initModel =
    { now = ""
    , routes = []
    }


-- UPDATE
type Msg
    = ChangeUrl Url.Url
    | GotInfo (Result Http.Error Model)

update : Msg -> Model -> Common.Flags -> (Model, Cmd Msg)
update msg model flags =
    case msg of
        ChangeUrl url ->
            ( model, getInfo flags )
        GotInfo result ->
            case result of
                Ok content ->
                    ( content, Cmd.none )
                Err _ ->
                    ( model, Cmd.none )


-- REFRESH
getInfo : Common.Flags -> Cmd Msg
getInfo flags =
    Http.get
        { url = flags.apiPath ++ "srv/routes.json"
        , expect = Http.expectJson GotInfo modelDecoder
        }

modelDecoder : D.Decoder Model
modelDecoder = 
    D.map2 Model
        (D.succeed "")
        (D.list infoDecoder)

infoDecoder : D.Decoder RouteInfo
infoDecoder = 
    D.map3 RouteInfo
        (D.field "path" D.string)
        (D.field "methods" (D.list D.string))
        (D.field "matched" D.float)


-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    [ h2 [] [ text "Routes - Registered URLs" ] 
    , table []
        ( tr [] 
            [ th [] [ text "Matched" ]
            , th [] [ text "Methods" ]
            , th [] [ text "Path" ]
            ]
        :: List.map viewRouteRow model.routes
        )
    ]

viewRouteRow : RouteInfo -> Html msg
viewRouteRow info =
    tr [] 
        [ td [ style "text-align" "right" ] 
            [ text (FormatNumber.format 
                { usLocale | decimals = 0 } 
                info.matched
                ) 
            ]
        , td [] 
            [ text (Maybe.withDefault 
                "" 
                (List.Extra.foldl1 (\a b -> a ++ ", " ++ b) info.methods)
                ) 
            ]
        , td [] [ text info.path ]
        ]

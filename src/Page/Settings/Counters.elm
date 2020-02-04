-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings/Counters.elm

module Page.Settings.Counters exposing (Model, initModel, Msg(..), update, view)

import Common
import FormatNumber
import FormatNumber.Humanize exposing (ZeroStrategy(..))
import FormatNumber.Locales exposing (usLocale)
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import Url


-- MODEL
type alias Counter =
    { name : String
    , value : Float
    }
type alias Model =
    { counters : List Counter 
    }

initModel : Model
initModel =
    { counters = [] }


-- UPDATE
type Msg
    = ChangeUrl Url.Url
    | GotCounters (Result Http.Error (List Counter))

update : Msg -> Model -> Common.Flags -> (Model, Cmd Msg)
update msg model flags =
    case msg of
        ChangeUrl _ ->
            ( model, getCounters flags )
        GotCounters result ->
            case result of
                Ok content ->
                    ( { model | counters = content }
                    , Cmd.none
                    )
                Err _ ->
                    ( model, Cmd.none )


-- REFRESH
getCounters : Common.Flags -> Cmd Msg
getCounters flags =
    Http.get
        { url = flags.apiPath ++ "srv/counters.json"
        , expect = Http.expectJson GotCounters countersDecoder
        }

-- { "name0": 0.0, "name1": 1.0, ... }
countersDecoder : D.Decoder (List Counter)
countersDecoder = 
    D.map (List.map keyValueToCounter) (D.keyValuePairs D.float)

-- [ "name", 0.0 ]
keyValueToCounter : (String, Float) -> Counter
keyValueToCounter (k, v) =
    { name = k, value = v }


-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    [ h2 [] [ text "Performance Counters"]
    , p [] []
    , table [] (
        tr [] 
            [ th [] [ text "Value" ]
            , th [] [ text "Name" ]
            ]
        ::
        List.map viewCounterRow model.counters
        )
    ]

viewCounterRow : Counter -> Html msg
viewCounterRow cnt =
    tr [] 
        [ td 
            [ style "text-align" "right" 
            , style "padding-right" "20px"
            ] 
            [ text (FormatNumber.humanize usLocale RemoveZeros cnt.value) ]
        , td [] [ text cnt.name ]
    ]

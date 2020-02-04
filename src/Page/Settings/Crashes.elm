-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings/Crashes.elm

module Page.Settings.Crashes exposing (Model, initModel, Msg(..), update, view)

import Common
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import Json.Decode.Pipeline as DP
import Url


-- MODEL
type alias Model =
    { now : String
    , files : List Common.FileInfo
    }

initModel : Model
initModel =
    { now = ""
    , files = []
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
        { url = flags.apiPath ++ "srv/crashes.json"
        , expect = Http.expectJson GotInfo modelDecoder
        }

modelDecoder : D.Decoder Model
modelDecoder = 
    D.succeed Model
        |> DP.required "now" D.string
        |> DP.required "files" (D.list Common.fileInfoDecoder)


-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    Common.viewFileInfo "Crash Dumps" 
        (flags.apiPath ++ "srv/crashes/") 
        model.files

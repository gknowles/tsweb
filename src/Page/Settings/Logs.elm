-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings/Logs.elm

module Page.Settings.Logs exposing (Model, initModel, Msg(..), update, view)

import Common
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import Json.Decode.Pipeline as DP
import Url
import Url.Parser as UP exposing ((</>), (<?>))
import Url.Parser.Query as UPQ


-- MODEL
type alias LogsInfo =
    { now : String
    , files : List Common.FileInfo
    }
type alias LogTailInfo =
    { now : String
    , file : Common.FileInfo
    , limit : Int
    , lines : List String
    }
type Model 
    = ModelLogs LogsInfo
    | ModelLogTail LogTailInfo

initModel : Model
initModel = ModelLogs
    { now = ""
    , files = []
    }


-- ROUTE
type Route
    = NotFound
    | Logs (Maybe String)

routeParser : UP.Parser (Route -> a) a
routeParser = 
    UP.oneOf
        [ UP.map Logs (UP.s "settings" </> UP.s "logs" <?> UPQ.string "file")
        ]

getRoute : Common.Flags -> Url.Url -> Route
getRoute flags url = 
    { url | path = String.replace flags.basePath "/" url.path }
        |> UP.parse routeParser
        |> Maybe.withDefault NotFound


-- UPDATE
type Msg
    = ChangeUrl Url.Url
    | GotInfo (Result Http.Error Model)

update : Msg -> Model -> Common.Flags -> (Model, Cmd Msg)
update msg model flags =
    case msg of
        ChangeUrl url ->
            changeRoute model flags url
        GotInfo result ->
            case result of
                Ok content ->
                    ( content, Cmd.none )
                Err _ ->
                    ( model, Cmd.none )

changeRoute : Model -> Common.Flags -> Url.Url -> (Model, Cmd Msg)
changeRoute model flags url =
    case getRoute flags url of
        Logs Nothing -> 
            (model, getLogs flags)
        Logs (Just file) ->
            (model, getLogTail flags file)
        _ ->
            (model, Cmd.none)

-- REFRESH
getLogs : Common.Flags -> Cmd Msg
getLogs flags =
    Http.get
        { url = flags.apiPath ++ "srv/logfiles.json"
        , expect = Http.expectJson GotInfo logsDecoder
        }

logsDecoder : D.Decoder Model
logsDecoder = 
    D.map ModelLogs logsInfoDecoder

logsInfoDecoder : D.Decoder LogsInfo
logsInfoDecoder = 
    D.succeed LogsInfo
        |> DP.required "now" D.string
        |> DP.required "files" (D.list Common.fileInfoDecoder)

getLogTail : Common.Flags -> String -> Cmd Msg
getLogTail flags file =
    Http.get
        { url = flags.apiPath ++ "srv/logtail/" ++ file
        , expect = Http.expectJson GotInfo logTailDecoder
        }

logTailDecoder : D.Decoder Model
logTailDecoder =
    D.map ModelLogTail logTailInfoDecoder

logTailInfoDecoder : D.Decoder LogTailInfo
logTailInfoDecoder = 
    D.succeed LogTailInfo
        |> DP.required "now" D.string
        |> DP.custom Common.fileInfoDecoder
        |> DP.required "limit" D.int
        |> DP.required "lines" (D.list D.string)

-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    case model of
        ModelLogs info ->
            Common.viewFileInfo "Log Files" 
                (flags.basePath ++ "settings/logs?file=")
                info.files
        ModelLogTail info ->
            viewLogTail info

viewLogTail : LogTailInfo -> List (Html msg)
viewLogTail info =
    [ h2 [] [ text "Log File Tail" ]
    , dl [ class "row" ] (
        viewDefItem "Name" info.file.path
        ++ viewDefItem "Size" (String.fromFloat info.file.size)
        ++ viewDefItem "Last Modified" info.file.mtime
        ++ viewDefItem "Limit" (String.fromInt info.limit)
    )
    , h3 [] [ text "Content" ]
    , p [ style "white-space" "pre" ] 
        [ text (List.foldr (\a b -> a ++ "\n" ++ b) "" info.lines) ]
    ]

viewDefItem : String -> String -> List (Html msg)
viewDefItem term desc =
    [ dt [ class "col-sm-2" ] [ text term ]
    , dd [ class "col-sm-9" ] [ text desc ]
    ]

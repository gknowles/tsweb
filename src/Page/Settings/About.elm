-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings/About.elm

module Page.Settings.About exposing (Model, initModel, Msg(..), update, view)

import Common
import FormatNumber
import FormatNumber.Humanize exposing (ZeroStrategy(..))
import FormatNumber.Locales exposing (usLocale)
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import Json.Decode.Pipeline as DP
import Url

-- MODEL
type alias DirInfo =
    { path : String
    , spaceAvail : Float
    , spaceTotal : Float
    }
type alias ConfigInfo =
    { path : String
    , lastChanged : String
    , changes : Int
    }
type alias Model =
    { now : String
    , version : String
    , service : Bool
    , startTime : String
    , rootDir : String
    , dataDir : DirInfo
    , logDir : DirInfo
    , crashDir : DirInfo
    , config : List ConfigInfo
    , accountName : String
    , accountDomain : String
    }

initModel : Model
initModel =
    { now = ""
    , version = "-" 
    , service = False
    , startTime = "-"
    , rootDir = "-"
    , dataDir = { path = "", spaceAvail = 0, spaceTotal = 0 }
    , logDir = { path = "", spaceAvail = 0, spaceTotal = 0 }
    , crashDir = { path = "", spaceAvail = 0, spaceTotal = 0 }
    , config = []
    , accountName = ""
    , accountDomain = ""
    }


-- UPDATE
type Msg
    = ChangeUrl Url.Url
    | GotAbout (Result Http.Error Model)

update : Msg -> Model -> Common.Flags -> (Model, Cmd Msg)
update msg model flags =
    case msg of
        ChangeUrl url ->
            ( model, getAbout flags )
        GotAbout result ->
            case result of
                Ok content ->
                    ( content, Cmd.none )
                Err _ ->
                    ( model, Cmd.none )


-- REFRESH
getAbout : Common.Flags -> Cmd Msg
getAbout flags =
    Http.get
        { url = flags.apiPath ++ "srv/about.json"
        , expect = Http.expectJson GotAbout modelDecoder
        }

modelDecoder : D.Decoder Model
modelDecoder = 
    D.succeed Model
        |> DP.required "now" D.string
        |> DP.required "version" D.string
        |> DP.required "service" D.bool
        |> DP.required "startTime" D.string
        |> DP.required "rootDir" D.string
        |> DP.required "dataDir" dirDecoder
        |> DP.required "logDir" dirDecoder
        |> DP.required "crashDir" dirDecoder
        |> DP.required "config" (D.list configDecoder)
        |> DP.required "account" (D.index 0 (D.field "name" D.string))
        |> DP.required "account" (D.index 1 (D.field "domain" D.string))

dirDecoder : D.Decoder DirInfo
dirDecoder = 
    D.map3 DirInfo
        (D.field "path" D.string)
        (D.field "spaceAvail" D.float)
        (D.field "spaceTotal" D.float)

configDecoder : D.Decoder ConfigInfo
configDecoder = 
    D.map3 ConfigInfo  
        (D.field "path" D.string)
        (D.field "lastChanged" D.string)
        (D.field "changes" D.int)

-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    [ h2 [] [ text "Execution"]
    , dl [ class "row" ] (
        viewDefItem "Product Version" model.version
        ++ viewDefItem "Start Time" model.startTime
        ++ viewDefItem "Root Directory" model.rootDir
        ++ viewDefItem "System Account" 
            ( case model.accountName of
                "" ->
                    "-"
                _ ->
                    model.accountName ++ "@" ++ model.accountDomain
            )
        ++ viewDefItem "Windows Service"
            (if model.service then "true" else "false")
        )
    , h2 [] [ text "Disk Space" ]
    , table [] 
        [ tr [] 
            [ th [] []
            , th [ style "text-align" "center" ] [ text "Path" ]
            , th [ style "text-align" "center" ] [ text "Total" ]
            , th [ style "text-align" "center" ] [ text "In Use" ]
            ]
        , viewSpaceRow "Data" model.dataDir
        , viewSpaceRow "Logs" model.logDir
        , viewSpaceRow "Crashes" model.crashDir
        ]
    ]

viewDefItem : String -> String -> List (Html msg)
viewDefItem term desc =
    [ dt [ class "col-sm-2" ] [ text term ]
    , dd [ class "col-sm-9" ] [ text desc ]
    ]

viewSpaceRow : String -> DirInfo -> Html msg
viewSpaceRow name dir =
    if String.length dir.path > 0 then
        tr [] 
            [ td [] [ text name ]
            , td [ style "padding" "0px 10px" ] [ text dir.path ]
            , td [ style "padding" "0px 10px", style "text-align" "right" ] 
                [ text (FormatNumber.format 
                    { usLocale | decimals = 0 } 
                    dir.spaceTotal
                    ) 
                ]
            , td [ style "padding" "0px 10px", style "text-align" "right" ] 
                [ text (FormatNumber.format 
                    { usLocale | decimals = 3 } 
                    (100 * dir.spaceAvail / dir.spaceTotal)
                    )
                , text "%"
                ]
            ]
    else
        tr [] []

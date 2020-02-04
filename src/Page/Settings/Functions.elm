-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Settings/Functions.elm

module Page.Settings.Functions exposing (Model, initModel, Msg(..), update, 
    view)

import Common
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import Json.Decode.Pipeline as DP
import List.Extra
import Url


-- MODEL
type alias ArgInfo =
    { name : String
    , argType : String
    , require : Bool
    , multiple : Bool
    , values : List String
    }
type alias FuncInfo =
    { name : String
    , group : String
    , args : List ArgInfo
    }
type alias Model =
    { now : String
    , functions : List FuncInfo
    }

initModel : Model
initModel =
    { now = ""
    , functions = []
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
        { url = flags.apiPath ++ "functions/index.json"
        , expect = Http.expectJson GotInfo modelDecoder
        }

modelDecoder : D.Decoder Model
modelDecoder = 
    D.map2 Model
        (D.succeed "")
        (D.list infoDecoder)

infoDecoder : D.Decoder FuncInfo
infoDecoder = 
    D.map3 FuncInfo
        (D.field "name" D.string)
        (D.field "group" D.string)
        (D.field "args" (D.list argDecoder))

argDecoder : D.Decoder ArgInfo
argDecoder =
    D.succeed ArgInfo
        |> DP.required "name" D.string
        |> DP.required "type" D.string
        |> DP.optional "require" D.bool False
        |> DP.optional "multiple" D.bool False
        |> DP.optional "values" (D.list D.string) []


-- VIEW
view : Model -> Common.Flags -> List (Html msg)
view model flags =
    let
        groups = List.Extra.groupWhile 
            (\a b -> a.group == b.group) 
            (List.sortBy .group model.functions)
    in
        List.concat (List.map viewGroup groups)

viewGroup : (FuncInfo, List FuncInfo) -> List (Html msg)
viewGroup group =
    let
        funcs = List.sortBy .name (Tuple.first group :: Tuple.second group)
    in
        h2 [] [ text (Tuple.first group).group ] 
        :: List.map viewFunc funcs

viewFunc : FuncInfo -> Html msg
viewFunc func =
    p [] (List.concat 
        [ [ span [] [ text func.name ]
          , text "("
          ]
        , viewArgs func.args
        , [ text ")" ]
        ])


viewArgs : List ArgInfo -> List (Html msg)
viewArgs args =
    case args of
        [] ->
            []
        first :: rest ->
            List.concat 
                (  viewArg first
                :: List.map (\a -> text ", " :: viewArg a) rest
                )

viewArg : ArgInfo -> List (Html msg)
viewArg arg =
    [ span [] [ text arg.argType ]
    , text " "
    , span [] [ text arg.name ]
    ]
    ++ 
    if arg.multiple then 
        [ text "[]" ]
    else 
        []
    ++ 
    if arg.require then
        []
    else
        [ text " = "
        , span [] [ text "{}" ]
        ]
    
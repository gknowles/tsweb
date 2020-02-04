-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Main.elm

module Main exposing (main)

import Common
import Page
import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Url


-- MAIN
main : Program Common.Flags Model Msg
main = Browser.application
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    , onUrlChange = ChangedUrl
    , onUrlRequest = ClickedLink
    }


-- MODEL
type alias Model =
    { key : Nav.Key
    , flags : Common.Flags
    , data : Page.Model 
    }

init : Common.Flags -> Url.Url -> Nav.Key -> (Model, Cmd Msg)
init ({basePath, apiPath} as flags) url key =
    changeRoute 
        { flags = 
            { basePath = pathDir flags.basePath
            , apiPath = flags.apiPath 
            }
        , key = key
        , data = Page.initModel 
        } 
        url

pathDir : String -> String
pathDir path =
    let
        last = String.indexes "/" path 
            |> List.reverse 
            |> List.head 
            |> Maybe.withDefault 0
    in
        String.left (last + 1) path
    

-- UPDATE
type Msg
    = ClickedLink Browser.UrlRequest
    | ChangedUrl Url.Url
    | GotPageMsg Page.Msg

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        ClickedLink urlRequest ->
            case urlRequest of 
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )
                Browser.External href ->
                    ( model, Nav.load href )
        ChangedUrl url ->
            changeRoute model url
        GotPageMsg subMsg ->
            Common.updateWith (\a -> { model | data = a })
                GotPageMsg
                (Page.update subMsg model.data model.flags)

changeRoute : Model -> Url.Url -> (Model, Cmd Msg)
changeRoute model url =
    update (GotPageMsg (Page.ChangedUrl url)) model


-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


-- VIEW
view : Model -> Browser.Document Msg
view model =
    { title = "tismet"
    , body = Page.view model.data model.flags
    }

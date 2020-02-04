-- Copyright Glen Knowles 2020.
-- Distributed under the Boost Software License, Version 1.0.
--
-- Page/Common.elm

module Common exposing 
    ( updateWith
    , apiPath
    , Flags
    , FileInfo
    , fileInfoDecoder
    , viewFileInfo
    )

import FormatNumber
import FormatNumber.Humanize exposing (ZeroStrategy(..))
import FormatNumber.Locales exposing (usLocale)
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Decode as D
import Url
import Url.Parser as UP exposing ((</>))


updateWith : (subModel -> topModel) -> (subMsg -> topMsg)
    -> ( subModel, Cmd subMsg )
    -> ( topModel, Cmd topMsg )
updateWith toModel toMsg ( subModel, subCmd ) =
    ( toModel subModel
    , Cmd.map toMsg subCmd
    )

type alias Flags = 
    { basePath : String
    , apiPath : String
    }
apiPath : String
apiPath =
    "http://localhost:8888/"


type alias FileInfo =
    { path : String
    , mtime : String
    , size : Float
    }

fileInfoDecoder : D.Decoder FileInfo
fileInfoDecoder = 
    D.map3 FileInfo
        (D.field "name" D.string)
        (D.field "mtime" D.string)
        (D.field "size" D.float)

-- VIEW
viewFileInfo : String -> String -> List FileInfo -> List (Html msg)
viewFileInfo title prefix files =
    [ h2 [] [ text title ]
    , table [] 
        ( tr [] 
            [ th [ style "text-align" "center" ] [ text "Name" ]
            , th [ style "padding-left" "20px", style "text-align" "center" ] 
                [ text "Size" ]
            , th [ style "padding-left" "20px", style "text-align" "center" ] 
                [ text "Age" ]
            ]
        :: List.map (viewFileRow prefix) files
        )
    ]

viewFileRow : String -> FileInfo -> Html msg
viewFileRow prefix info =
    tr [] 
        [ td [] 
            [ a [ href (prefix ++ info.path) ] [ text info.path ] ]
        , td [ style "padding-left" "20px", style "text-align" "right" ] 
            [ text (FormatNumber.format 
                { usLocale | decimals = 0 } 
                info.size
                ) 
            ]
        , td [ style "padding-left" "20px" ] [ text info.mtime ]
        ]

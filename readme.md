![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Table of sgRNA with radial representation

![example display](https://github.com/sophielem/crispr_table/blob/radial_display/docs/example.png)

## Usage
Need only one property : *complete_data*      Another component will be installed : *radial-crispr* to create the radial representation inside table.

You can search a sgRNA by a regex or by a minimun occurence.

#### complete_data
A list of dictionary object in JSON format. Each dictionary has two keys : sequence and occurences. Occurences contains a list of dictionary object with org and all_ref as keys. all_ref contains a list of dictionary object with ref and coords keys which contains a list of coordinates. Coordinate must match the regex : __[+-]\\([0-9]\*,[0-9]*\\)__
```JSON
[
    {
        "sequence": "AAAACTCAAATGAATTGACGGGG",
        "occurences": [
            {
                "org": "Buchnera aphidicola (Cinara tujafilina) GCF_000217635.1",
                "all_ref": [
                    {
                        "ref": "NC_015662.1",
                        "coords": [
                            "-(195725,195747)"
                        ]
                    }
                ]
            },
            {
                "org": "Aliivibrio wodanis GCF_000953695.1",
                "all_ref": [
                    {
                        "ref": "NZ_LN554846.1",
                        "coords": [
                            "+(2675080,2675102)",
                            "+(2862314,2862336)",
                            "+(2959996,2960018)",
                            "-(507284,507306)",
                            "-(559657,559679)",
                            "-(661047,661069)"
                        ]
                    },
                    {
                        "ref": "NZ_LN554847.1",
                        "coords": [
                            "+(894485,894507)"
                        ]
                    }
                ]
            }
        ]
    }
]
```

## Event
None

## Authors
Sophie LEMATRE

## Date
July 18 2019

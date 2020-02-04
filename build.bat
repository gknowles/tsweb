rd /s/q output\dist
mkdir output\dist\assets
elm make src/Main.elm --optimize --output=output\dist\base.js
uglifyjs output\dist\base.js --compress "pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters,keep_fargs=false,unsafe_comps,unsafe" | uglifyjs --mangle --output=output\dist\base.min.js
copy index.html output\dist /y
xcopy assets\*.* output\dist\assets /s/y

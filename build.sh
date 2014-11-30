jsx -x jsx src build
./node_modules/cssmin/bin/cssmin src/style.css > build/style.css
./node_modules/uglify-js/bin/uglifyjs src/urlparse.js > build/urlparse.js
./node_modules/uglify-js/bin/uglifyjs build/url.js > build/url.min.js
mv build/url.min.js build/url.js
sed 's/\.\//build\//g' src/index.html > index.html

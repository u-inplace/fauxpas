#!/bin/bash

bundle="fp.bundle.js"
target="/dist/$bundle"
repo="fauxpas"
branch=$1
cdnURL="https://combinatronics.com/u-inplace/$repo/$branch$target"

# Basic if statement
while true; do
    printf "\033c"
    echo @$branch
    echo @$cdnURL
    result=$(diff <(cat .$target) <(curl -s $cdnURL))
    if [[ $result != "" ]]; then
        echo Not synced.
    else
        echo .
    fi
    sleep 2
done

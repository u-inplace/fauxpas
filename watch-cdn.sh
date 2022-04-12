#!/bin/bash

bundle="Core.bundle.js"
target="/dist/$bundle"
repo="fauxpas"
branch=$1

# Basic if statement
while true; do
    printf "\033c"
    echo @$branch
    result=$(diff <(cat .$target) <(curl -s https://combinatronics.com/u-inplace/$repo/$branch$target))
    if [[ $result != "" ]]; then
        echo Not synced.
    else
        echo .
    fi
    sleep 2
done

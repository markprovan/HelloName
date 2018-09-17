#!/bin/bash

rm index.zip
zip index.zip *
aws lambda update-function-code --function-name HelloName --zip-file fileb://index.zip

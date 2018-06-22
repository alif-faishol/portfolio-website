#! /bin/bash

# To deploy this react website to github pages
# Author Alif Faishol

if [[ ! $1 ]]; then
  echo "Missing arguments, github user/repo"
  exit 1
fi

github_url="$1"

if [[ ! -d ./build ]]; then
  echo "There's no 'build' folder, make sure you've already ran 'yarn build'"
  exit 1
fi

cd ./build
git init
git add .
git remote add origin git@github.com:$1

if [[ $2 ]]; then
  git commit -m "$2"
else 
  git commit -m "Deployed $(date)"
fi

git push -f origin master

cd ..
exit 0

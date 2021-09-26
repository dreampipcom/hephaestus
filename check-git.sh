# change to your repo branch to publish
publishingbranch="master"


# don't bother about what comes next.
git fetch origin
currentbranch=$(git symbolic-ref --short -q HEAD)

local="`git log --pretty=%H ...refs/heads/${currentbranch}^ | head -n 1`"
origin="`git ls-remote origin -h refs/heads/${publishingbranch} |cut -f1`"
dirtytree="$(git status --porcelain)"

echo "your `tput setaf 4;tput smso` local `tput rmso;tput setaf 7` is at: `tput setaf 4;tput smso` ${currentbranch} ${local} `tput rmso;tput setaf 7`"
echo "your `tput setaf 5;tput smso` origin `tput rmso;tput setaf 7` is at: `tput setaf 5;tput smso` ${publishingbranch} ${origin} `tput rmso;tput setaf 7`"

if [[ "${publishingbranch}" != "${currentbranch}" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` check if you're in your publishing branch. remember, you're about to publish a package version."
  exit 1
fi

if [[ "${dirtytree}" != "" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` your tree is DIRTY, please don't publish uncommited work. remember, you're about to publish a package version."
  exit 1
fi

if [[ "${origin}" != "${local}" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` check if you're up-to-date with remote. remember, you're about to publish a package version."
  exit 1
fi

checknpm=0
if [[ $2 = '' ]]; then
  if [[ $1 = '' ]]; then
    read -p "Would you like to check if your package version already exists on NPM? ('Y' for yes)" npm
    if [[ "${npm}" = "Y" || "${npm}" = "y" ]]; then
      checknpm=1
    fi
  else
    checknpm=1
  fi
fi

if [[ "${checknpm}" = 1 ]]; then
  packagename="$(node -p "require('./package.json').name")" 
  localpackageversion="$(node -p "require('./package.json').version")"
  remotepackageversion="$(npm info ${packagename} versions | grep -w "'${localpackageversion}'" | sed "s/'//g" | sed -e 's/^[ \t]*//' | sed "s/,//")"

  if [[ "${packagename}" = '' || "${localpackageversion}" = '' || ${remotepackageversion} = '' ]]; then
    echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` we couldn't check your local package against remote. is your package published already? do you have access to it via npm?"
    exit 1
  fi

  echo "package name is `tput setaf 6;tput smso` ${packagename} `tput rmso;tput setaf 7`"
  echo "local version is `tput setaf 4;tput smso` ${localpackageversion} `tput rmso;tput setaf 7`"
  
  if [[ "${remotepackageversion}" != '' ]]; then
    echo "there is a remote version `tput setaf 5;tput smso` ${remotepackageversion} `tput rmso;tput setaf 7`"
  fi


  if [[ "${localpackageversion}" = "${remotepackageversion}" ]]; then
    echo "`tput setaf 3;tput smso` WARNING `tput rmso;tput setaf 7` you're trying to publish a version that has already been published"

    read -p "`tput setaf 3;tput smso`ARE YOU SURE YOU WANT TO OVERWRITE THAT VERSION? ('Y' for yes)`tput rmso;tput setaf 7`" x
    if [[ "${x}" = 'Y' || "${x}" = 'y' ]]; then
      echo "Ok, we're going to `tput setaf 3;tput smso` replace `tput rmso;tput setaf 7` that version!"
    else
      echo "Aborting publishing... :)"
      exit 1
    fi
  fi
fi
  

echo "`tput setaf 2;tput smso` √ GOOD `tput rmso;tput setaf 7`  to publish, doing it now... :D"
sleep 2s
exit 0

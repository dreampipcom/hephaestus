# change to your repo branch to publish
publishingbranch="master"


# don't bother about what comes next.
git fetch origin
currentbranch=$(git symbolic-ref --short -q HEAD)

local="`git log --pretty=%H ...refs/heads/${currentbranch}^ | head -n 1`"
origin="`git ls-remote origin -h refs/heads/${publishingbranch} |cut -f1`"
dirtytree="$(git status --porcelain)"

echo "your `tput setaf 3;tput smso` local `tput rmso;tput setaf 7` is at: `tput setaf 3;tput smso` ${currentbranch} ${local} `tput rmso;tput setaf 7`"
echo "your `tput setaf 4;tput smso` origin `tput rmso;tput setaf 7` is at: `tput setaf 4;tput smso` ${publishingbranch} ${origin} `tput rmso;tput setaf 7`"

if [[ "${dirtytree}" != "" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` your tree is DIRTY, please don't publish uncommited work. remember, you're about to publish a package version."
  exit 1
fi

if [[ "${publishingbranch}" != "${currentbranch}" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` check if you're in your publishing branch. remember, you're about to publish a package version."
  exit 1
fi

if [[ "${origin}" != "${local}" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` check if you're up-to-date with remote. remember, you're about to publish a package version."
  exit 1
fi

echo "`tput setaf 2;tput smso` √ GOOD `tput rmso;tput setaf 7`  to publish, doing it now..."
exit 0


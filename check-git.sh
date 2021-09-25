# change to your repo branch to publish
basebranch="master"


# don't bother about what comes next.
git fetch origin
currentbranch=$(git symbolic-ref --short -q HEAD)

local="`git log --pretty=%H ...refs/heads/master^ | head -n 1`"
origin="`git ls-remote origin -h refs/heads/master |cut -f1`"
dirtytree=$(git diff --stat)

echo "your `tput setaf 3;tput smso` local `tput rmso;tput setaf 7` is at: `tput setaf 3;tput smso` ${currentbranch} ${local} `tput rmso;tput setaf 7`"
echo "your `tput setaf 4;tput smso` origin `tput rmso;tput setaf 7` is at: `tput setaf 4;tput smso` ${basebranch} ${origin} `tput rmso;tput setaf 7`"

if [[ "${dirtytree}" != "" ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` your tree is DIRTY, please don't publish uncommited work."
  exit 1
fi

if [[ ("${origin}" != "${local}") || ("${basebranch}" != "${currentbranch}") ]]; then
  echo "`tput setaf 1;tput smso` FAIL `tput rmso;tput setaf 7` check if you're in main branch and you're up-to-date. remember, you're about to publish a package version."
  exit 1
else
  echo "`tput setaf 2;tput smso` √ GOOD `tput rmso;tput setaf 7`  to publish, doing it now..."
  exit 0
fi

#!/bin/sh

# REMOTE DIRECTORY
REMOTE_DIR='uploads/react-interface'

#PROJECT DIRECTORY
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." >/dev/null && pwd )"

# CREDENTIALS
source $PROJECT_DIR'/src/custom-scripts/locals.sh'

#LOCAL DIRECTORY
LOCAL_DIR=$PROJECT_DIR'/build'

# RUNTIME!
echo
echo "Starting upload to $REMOTE_DIR at $HOST from $LOCAL_DIR"
date

lftp -e "mirror -Rc $LOCAL_DIR $REMOTE_DIR;exit" -u "$USER","$PASSWORD" $HOST <<EOF
exit
EOF
echo
echo "Transfer finished"
date
rsync -r --delete-after -e 'ssh -p 10059' --quiet $TRAVIS_BUILD_DIR/build $SAFER_GLOBE_SSH_USER@$SAFER_GLOBE_DEPLOY_HOST:/tmp/armsreport
ssh $SAFER_GLOBE_SSH_USER@$SAFER_GLOBE_DEPLOY_HOST -p 1059 <<'ENDSSH'
rm -rf /data/wordpress/htdocs/armsreport
mv /tmp/armsreport/build /data/wordpress/htdocs/armsreport
ENDSSH

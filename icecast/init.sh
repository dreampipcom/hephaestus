# !/bin/sh
# init.sh

sed -i /etc/icecast2/icecast.xml s/RADIO_PASSWORD/$RADIO_PASSWORD/g
sed -i /etc/icecast2/icecast.xml s/RADIO_BASEDIR/$RADIO_BASEDIR/g
sed -i /etc/icecast2/icecast.xml s/RADIO_HOSTNAME/$RADIO_HOSTNAME/g
sed -i /etc/icecast2/icecast.xml s/RADIO_IP/$RADIO_IP/g

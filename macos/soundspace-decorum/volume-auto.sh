#!/bin/zsh
HOURstr=$(date +%H)
HOUR=$((HOURstr + 0)) 
echo $HOUR

case $((
  ($HOUR >= 22 && $HOUR <= 23)   * 1 +
  ($HOUR >= 0 && $HOUR <= 5)  * 2 +
  ($HOUR >= 6 && $HOUR <= 7) * 3 +
  ($HOUR == 8) * 4 +
  ($HOUR == 9) * 5 +
  ($HOUR >= 10 && $HOUR <= 12) * 6 +
  ($HOUR >= 13 && $HOUR <= 15) * 7 +
  ($HOUR >= 16 && $HOUR <= 21) * 8))
	in
  (1) echo "setting to 30" && osascript -e "set volume output volume 30";;
  (2) echo "setting to 15" && osascript -e "set volume output volume 15";;
  (3) echo "setting to 30" && osascript -e "set volume output volume 30";;
  (4) echo "setting to 40" && osascript -e "set volume output volume 40";;
  (5) echo "setting to 50" && osascript -e "set volume output volume 50";;
  (6) echo "setting to 55" && osascript -e "set volume output volume 55";;
  (7) echo "setting to 40" && osascript -e "set volume output volume 40";;
  (8) echo "setting to 60" && osascript -e "set volume output volume 60";;
  (0) echo " time out of range";;
esac

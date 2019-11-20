#!/bin/bash
redeCluster=$1
var=0
for rede in $(prips -i 16 $redeCluster 10.0.255.255)
do
  redeLB=$rede
  var=$((var + 1))
  if [ $var -eq 2049 ]
  then
     break
  fi
done
echo $redeCluster
echo $redeLB

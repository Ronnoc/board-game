set -xe
for i in `seq 1 99|awk '{printf("%02d\n", $1)}'`;
do
    mkdir -p $i
    for j in `seq 1 999|awk '{printf("%03d\n", $1)}'`;
    do
        if [[ -e ${i}/${i}${j}.html ]];
        then
            continue;
        fi
        curl https://arkhamdb.com/card/${i}${j} > ${i}/${i}${j}.html;
        sleep 3
        fa=`md5sum  ${i}/${i}${j}.html|awk '{print $1}'`;
        fb="15b72f416e77092e2255de457edd29af";
        if [[ $fa == $fb ]];
        then
            break;
        fi
    done
done

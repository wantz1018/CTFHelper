import { Md5 } from "ts-md5";

function md5(str: string) {
    return Md5.hashStr(str);
}

export default md5;
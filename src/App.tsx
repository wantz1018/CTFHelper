import { useEffect, useState } from 'react'
import './App.css'
import matcher from './utils/match';
import { base64Decode, base64Encode } from './utils/crypto/base64';
import md5 from './utils/crypto/md5';
import { hexDecode } from './utils/crypto/hex';
import morseToText from './utils/crypto/morse';
import binaryToString from './utils/crypto/binary';
import { base85Decode, base85Encode } from './utils/crypto/base85';
import { base32Decode, base32Encode } from './utils/crypto/base32';
import { base16Decode, base16Encode } from './utils/crypto/base16';
import brainfuckDecode from './utils/crypto/brainfuck';
import rot13Decode from './utils/crypto/rot13';
import { quotedPrintableDecode } from './utils/crypto/quotedPrintable';
import htmlEntityDecode from './utils/crypto/htmlentity';
import { jwtDecode } from './utils/crypto/jwt';
import baconDecode from './utils/crypto/bacon';
import ceasarCipher from './utils/crypto/caesar';

interface ActionProps {
    code: string;
    type: string;
    payload: unknown;
    option: unknown;
    from?: PluginEnterFrom | undefined;
}

interface ResultProps {
    text: string;
    title: string;
}

function processText(text: string) {
    const trimmedText = text.trim();
    
    // 检查是否是命令格式（以特定前缀开头）
    const commandPrefixes = ['base64', 'b64e', 'b64d', 'md5', 'rot13', "caesar"];
    const isCommand = commandPrefixes.some(prefix => 
        trimmedText.toLowerCase().startsWith(prefix)
    );

    if (isCommand) {
        const parts = trimmedText.split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);
        return { command, args };
    }
    
    // 对于非命令文本，直接返回
    return trimmedText;
}


function App() {

    const [action, setAction] = useState<ActionProps>()

    useEffect(() => {
        window.utools.onPluginEnter((action) => {
            setAction(action)
        })
        window.utools.onMainPush((action) => {
            const result: ResultProps[] = [];
            const oText = action.payload as string;
            const pText = processText(action.payload as string);
            if (typeof pText === "string") {
                const matchTypes = matcher(pText); // 现在返回的是数组
                matchTypes.forEach(type => {
                    switch (type) {
                        case "ascii":
                            result.push({
                                text: "ascii解码->" + String.fromCharCode(parseInt(pText, 10)),
                                title: "ascii解码"
                            });
                            break;
                        case "bacon":
                            result.push({
                                text: "bacon解码->" + baconDecode(pText),
                                title: "bacon解码"
                            })
                            break;
                        case "base64":
                            result.push({
                                text: "base64解码->" + base64Decode(pText),
                                title: "base64解码"
                            });
                            break;
                        case "binary":
                            result.push({
                                text: "二进制解码->" + binaryToString(pText),
                                title: "二进制解码"
                            });
                            break;
                        case "brainfuck":
                            result.push({
                                text: "brainfuck解码->" + brainfuckDecode(pText),
                                title: "brainfuck解码"
                            })
                            break;
                        case "hex":
                            result.push({
                                text: "hex解码->" + hexDecode(pText),
                                title: "hex解码"
                            });
                            break;
                        case "htmlentity":
                            result.push({
                                text: "htmlentity解码->" + htmlEntityDecode(pText),
                                title: "htmlentity解码"
                            })
                            break;
                        case "morse":
                            result.push({
                                text: "morse解码->" + morseToText(oText),
                                title: "morse解码"
                            });
                            break;
                        case "jwt":
                            result.push({
                                text: "jwt解码->" + JSON.stringify(jwtDecode(pText), null, 4),
                                title: "jwt解码"
                            })
                            break;
                        case "quotedPrintable":
                            result.push({
                                text: "quotedPrintable解码->" + quotedPrintableDecode(oText),
                                title: "quotedPrintable解码"
                            })
                            break;
                        case "unicode":
                            result.push({
                                text: "unicode解码->" + JSON.parse(`"${pText}"`).replace(/\\u/g, "\\u"),
                                title: "unicode解码"
                            });
                            break;
                        case "url":
                            result.push({
                                text: "url解码->" + decodeURIComponent(pText),
                                title: "url解码"
                            });
                            break;
                        case "timestamp":
                            result.push({
                                text: "时间戳转换->" + new Date(parseInt(pText) * 1000).toLocaleString(),
                                title: "时间戳转换"
                            });
                            break;
                    }
                });
            } else if (typeof pText === "object") {
                switch (pText.command) {
                    case "base16decode":
                        result.push({
                            text: "base16解码->" + base16Decode(pText.args[0]),
                            title: "base16解码"
                        })
                        break;
                    case "base16encode":
                        result.push({
                            text: "base16编码->" + base16Encode(pText.args[0]),
                            title: "base16编码"
                        })
                        break;
                    case "base32decode":
                        result.push({
                            text: "base32解码->" + base32Decode(pText.args[0]),
                            title: "base32解码"
                        })
                        break;
                    case "base32encode":
                        result.push({
                            text: "base32编码->" + base32Encode(pText.args[0]),
                            title: "base32编码"
                        })
                        break;
                    case "base64decode":
                        result.push({
                            text: "base64解码->" + base64Decode(pText.args[0]),
                            title: "base64解码"
                        });
                        break;
                    case "base64encode":
                        result.push({
                            text: "base64编码->" + base64Encode(action.payload.replace(/^base64encode\s/i, "").replace(/^base64\s/i, "").replace(/^b64e\s/i, "")),
                            title: "base64编码"
                        });
                        break;
                    case "base85encode":
                        result.push({
                            text: "base85编码->" + base85Encode(action.payload.replace(/^base85encode\s/i, "").replace(/^base85\s/i, "").replace(/^b85e\s/i, "")),
                            title: "base85编码"
                        })
                        break;
                    case "base85decode":
                        result.push({
                            text: "base85编码->" + base85Decode(action.payload.replace(/^base85encode\s/i, "").replace(/^base85\s/i, "").replace(/^b85e\s/i, "")),
                            title: "base85编码"
                        })
                        break;
                    case "caesar":
                        result.push({
                            text: "ceasar密码->" + ceasarCipher(pText.args.slice(1).join(" "), parseInt(pText.args[0])),
                            title: "ceasar密码"
                        })
                        break;
                    case "md5":
                        result.push({
                            text: "md5计算->" + md5(action.payload.replace(/^md5\s/i, "")),
                            title: "md5计算"
                        });
                        break;
                    case "rot13":
                        result.push({
                            text: "rot13编码->" + rot13Decode(action.payload.replace(/^rot13\s/i, "")),
                            title: "rot13编码"
                        })
                        break;
                }
            }
            return result;
        }, (selectCallback) => {
            const text = selectCallback.option.text;
            window.utools.hideMainWindowPasteText(text.split("->")[1]);
        });

    })

    return (
        <>
            <div>{action?.payload as string}</div>
            
        </>
    )
}

export default App

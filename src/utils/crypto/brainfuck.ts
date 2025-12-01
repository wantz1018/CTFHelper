function brainfuckDecode(code: string): string {
    const cells = new Array(30000).fill(0);  // 初始化30000个单元格
    let pointer = 0;  // 数据指针
    let output = '';  // 输出字符串
    const stack: number[] = [];  // 用于处理循环的栈

    for (let i = 0; i < code.length; i++) {
        const command = code[i];
        
        switch (command) {
            case '>':  // 指针右移
                pointer++;
                break;
            case '<':  // 指针左移
                pointer--;
                break;
            case '+':  // 当前单元格值加1
                cells[pointer]++;
                break;
            case '-':  // 当前单元格值减1
                cells[pointer]--;
                break;
            case '.':  // 输出当前单元格的ASCII值
                output += String.fromCharCode(cells[pointer]);
                break;
            case ',':  // 输入到当前单元格（这里简化处理）
                cells[pointer] = 0;  // 实际应用中应该从输入获取
                break;
            case '[':  // 循环开始
                if (cells[pointer] === 0) {
                    // 跳转到匹配的 ]
                    let level = 1;
                    while (level > 0) {
                        i++;
                        if (code[i] === '[') level++;
                        if (code[i] === ']') level--;
                    }
                } else {
                    stack.push(i);
                }
                break;
            case ']':  // 循环结束
                if (cells[pointer] !== 0) {
                    i = stack[stack.length - 1];
                } else {
                    stack.pop();
                }
                break;
        }
    }

    return output;
}
export default brainfuckDecode;
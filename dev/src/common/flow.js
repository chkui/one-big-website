/**
 *
 * @param value 输入值
 * @param chain
 * @constructor
 */
function Flow(value, chain) {
    this.value = value;
    this.chain = chain ? chain.concat([value]) : [value];
}
Flow.prototype.then = function (foo) {
    return this.value ? new Flow(foo(this.value, this.chain), this.chain): new Flow(this.value, this.chain)
}
Flow.prototype.else = function (foo) {
    return this.value ? this.value : (foo ? foo(this.chain) : false);
}

/**
 * 函数式处理,输出正常返回then()，数据错误直接调用else()
 * @param value
 * @returns {Flow}
 */
function flow (value) {
    return new Flow(value);
}

export {flow, Flow}
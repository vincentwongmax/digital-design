// ==UserScript==
// @name         Boolean formatter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://electronics-course.com/boolean-algebra
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var button = document.createElement("button");
    button.innerHTML = "GO";
    button.type = "button";

    var body = document.getElementsByClassName("form-group")[1];
    body.appendChild(button);


    let input = document.getElementById("expr") ;
    document.getElementById("expr").value = '' ;
    let text = document.getElementById("expr").value;

    input.addEventListener('change', updateValue);

    function updateValue(e) {
        text = e.target.value;
    }
    button.addEventListener ("click", function() {
        changejs(text);
    });


   function changejs(text) {
            let number = text;
       number = number.toLowerCase()
        let numbermul = [];
            console.log(number);
            let Step0 = '';
            let Cnumber = [];
            let CnumberStep1 = '';
            let brackets = [];
            let bracketsLevel = -1 ;
            if (number.indexOf('-') > -1) {
                alert('輸入格式錯誤');
                return;
            }

            if (number.indexOf('*') > -1) {
                if (confirm("請不要輸入'*'，是否要進行自動去除'*' 號")) {
                    numbermul = number.split("*");
                    number = numbermul.join('');
                }
            }

            for (let i = 0; i < number.length; i++) {
                if (number[i] == '(') {
                    brackets.push(Cnumber.length);
                    bracketsLevel += 1 ;
                }

                if(number[i] == ')' && number[i+1] !== "'"){
                    brackets.splice(bracketsLevel, 1)
                    bracketsLevel = bracketsLevel - 1 ;
                }

                if (number[i] == "'") {
                    if (number[i - 1] == ')') {
                        if(Cnumber[brackets[bracketsLevel]] == '+'){
                          Cnumber.splice(brackets[bracketsLevel] + 1, 0, '~')
                        }else{
                          Cnumber.splice(brackets[bracketsLevel], 0, '~')
                        }
                        brackets.splice(bracketsLevel, 1)
                        bracketsLevel = bracketsLevel - 1 ;
                    } else {
                        Cnumber.pop();
                        Cnumber.push('~');
                        Cnumber.push(number[i - 1]);
                    }
                    if (number[i + 1] == '(' || number[i + 1] !== '+') {
                        if (number[i + 1] !== ')') {
                            if (i !== number.length - 1) {
                                if (Cnumber[Cnumber.length - 1] !== '*') {
                                    Cnumber.push('*');
                                }
                            }
                        }
                    }

                } else if (number[i] == ')' && number[i + 1] == '(') {
                    Cnumber.push(number[i]);
                    if (Cnumber[Cnumber.length - 1] !== '*') {
                        Cnumber.push('*');
                    }

                } else if (number[i] == ')' && number[i + 1] == "'" && number[i + 2] == '(') {
                    Cnumber.push(number[i]);
                    if (Cnumber[Cnumber.length - 1] !== '*') {
                        Cnumber.push('*');
                    }

                } else if (number[i] !== '+' && number[i + 1] !== '+') {
                    if (number[i + 1] !== "'" && number[i] !== '(' && number[i + 1] !== ')') {
                        Cnumber.push(number[i]);
                        if (i !== number.length - 1) {
                            if (Cnumber[Cnumber.length - 1] !== '*') {
                                Cnumber.push('*');
                            }

                        }
                    } else {
                        Cnumber.push(number[i]);
                    }
                } else {
                    Cnumber.push(number[i]);
                }
            }
            CnumberStep1 = Cnumber.join('');
            console.log(CnumberStep1);
             document.getElementById("expr").value = CnumberStep1;
            return CnumberStep1;
            //https://greasyfork.org/en/scripts/423255-boolean-formatter/code
        }
})();
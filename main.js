let allGoals = [];
let i = 0;
let darkBackground = "hsl(235, 21%, 11%)";
let darkMainBackground = "hsl(235, 24%, 19%)";
let lightBackground = "hsl(0, 0%, 98%)";
let lightMainBackground = "hsl(0, 0%, 100%)";
let mode = "dark";
let j = 0;
let complete = 0;

counter.innerHTML = nowLength();


(function () {
    let input = document.querySelector('input');


    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            input.value = input.value.trim();
            if (input.value == '') {

            }
            else {
                let div = (`
            <div class="goal" id="goal${i}">
                <div class="box1">
                    <div class="circle" id="circle${i}" onclick="isComplete(${i})">
                        <div class="none-circle" id="none-circle${i}"></div>
                        <img src="images/icon-check.svg" class="check" id="check${i}" hidden="true">
                    </div>
                     <p onclick="isComplete(${i})" class="text" id="text${i}">${input.value}</p>
                </div>
                <div class="delete" id="delete${i}" onclick="isDelete(this.parentNode.id)"></div>
            </div>`);
                add.insertAdjacentHTML('beforebegin', div);
                allGoals.push({ goal: input.value, completed: 0 });

                console.log(allGoals);
                counter.innerHTML = nowLength();
                input.value = '';

                if (complete == 1) {
                    document.getElementById(`goal${i}`).classList.add("delete-element");
                }
                i++;
            }
        }
    });
})();

function isComplete(number) {
    document.getElementById(`check${number}`).hidden = !document.getElementById(`check${number}`).hidden;
    document.getElementById(`none-circle${number}`).hidden = !document.getElementById(`none-circle${number}`).hidden;

    if (mode == "dark") {
        (document.getElementById(`text${number}`).style.color == "gray" ?
            document.getElementById(`text${number}`).style.color = "white" :
            document.getElementById(`text${number}`).style.color = "gray");
    } else {
        (document.getElementById(`text${number}`).style.color == "gray" ?
            document.getElementById(`text${number}`).style.color = "black" :
            document.getElementById(`text${number}`).style.color = "gray");
    }
    (document.getElementById(`text${number}`).style.textDecoration == "line-through" ?
        document.getElementById(`text${number}`).style.textDecoration = "none" :
        document.getElementById(`text${number}`).style.textDecoration = "line-through");

    (allGoals[number].completed == 1 ? allGoals[number].completed = 0 : allGoals[number].completed = 1);

    counter.innerHTML = nowLength();




}

function isDelete(thisId) {

    let number = '';

    for (let index = 0; index < thisId.length; index++) {
        if (!isNaN(+thisId[index])) {
            number += thisId[index];
        }
    }

    allGoals.splice(+number, 1, '');
    console.log(allGoals);
    counter.innerHTML = nowLength();
    document.getElementById(thisId).remove();
}

function nowLength() {
    let count = 0;
    for (let index = 0; index < allGoals.length; index++) {
        if ((allGoals[index].completed == 0) && (allGoals[index] != '')) {
            count++;
        }

    }
    return count;
}

function modeChange() {
    document.getElementById("sun").hidden = !document.getElementById("sun").hidden;
    document.getElementById("moon").hidden = !document.getElementById("moon").hidden;
    document.querySelectorAll("link")[0].href = "lightStyle.css";
    if (mode == "dark") {
        document.querySelectorAll("link")[0].href = "lightStyle.css";
        mode = "light";
    } else {
        document.querySelectorAll("link")[0].href = "style.css";
        mode = "dark";
    }


}

function changeGoals(number) {

    document.getElementById(`button${j}`).classList.replace('selected', 'unselected');
    document.getElementById(`button${number}`).classList.replace('unselected', 'selected');
    j = number;

    switch (number) {
        case 0:
            complete = 0;
            for (let index1 = 0; index1 < allGoals.length; index1++) {
                if (allGoals[index1] != "") {
                    document.getElementById(`goal${index1}`).classList.remove("delete-element"); // 135 144 126
                }
            }
            break;
        case 1:
            complete = 0;
            for (let index1 = 0; index1 < allGoals.length; index1++) {
                if (allGoals[index1].completed == 1) {
                    document.getElementById(`goal${index1}`).classList.add("delete-element");
                } else if (allGoals[index1] == "") { }
                else {
                    document.getElementById(`goal${index1}`).classList.remove("delete-element");
                }
            }
            break;
        case 2:
            complete = 1;
            for (let index1 = 0; index1 < allGoals.length; index1++) {
                if (allGoals[index1].completed == 0) {
                    document.getElementById(`goal${index1}`).classList.add("delete-element");
                } else if (allGoals[index1] == "") { }
                else {
                    document.getElementById(`goal${index1}`).classList.remove("delete-element");
                }
            }
            break;

    }

}

function clearCompleted() {
    for (let index = 0; index < allGoals.length; index++) {
        if (allGoals[index].completed == 1) {
            document.getElementById(`goal${index}`).remove();
            allGoals[index] = "";
        }

    }
}
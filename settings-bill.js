module.exports = function SettingsBill() {
    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;


    var callCostTotal = 0;
    var smsCostTotal = 0;

    let actionList = [];

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel,
        }
    }


    function setCallCost(callCost) {
        theCallCost = callCost;
    }

    function getCallCost() {
        return theCallCost;
    }
    //video
    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        return actionList.filter((action) => action.type === type)
    }
    //video
    function setSmsCost(smsCost) {
        theSmsCost = smsCost;
    }

    function getSmsCost() {
        return theSmsCost;
    }

    function setWarningLevel(warningLevel) {
        theWarningLevel = warningLevel;
    }

    function getWarningLevel() {
        return theWarningLevel;
    }

    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = criticalLevel;
    }

    function getCriticalLevel() {
        return theCriticalLevel;
    }
    //video
    function recordAction(action) {
        let cost = 0;
        if (action === 'call') {
            cost = callCost;
        } else if (action === 'sms') {
            cost = smsCost;
        }
        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });
    }

    function getTotal(type) {
        return actionList.reduce((total, action) => {
            let val = action.type === type ? action.cost : 0;
            return total + val;
        }, 0);
    }
    //video
    function calcBill(bill) {

        if (bill === 'call') {
            makeCall();
        } else if (bill === 'sms') {
            sendSms();
        }
    }


    function makeCall() {
        if (!hasReachedCriticalLevel1()) {

        }
        callCostTotal += theCallCost;
    }
    //video

    function getTotalCost() {
        return callCostTotal + smsCostTotal;
    }
    //video

    function getTotalCallCost() {
        return callCostTotal;
    }

    function getTotalSmsCost() {
        return smsCostTotal;
    }

    function sendSms() {
        if (!hasReachedCriticalLevel1()) {

        }
        smsCostTotal += theSmsCost;
    }

    function hasReachedCriticalLevel1() {
        return getTotalCost() >= getCriticalLevel()
    }
    // video

    function grandTotal() {
        return getTotal('sms') + getTotal('call');

    }

    function totals() {
        let smsTotal = getTotal('sms');
        let callTotal = getTotal('call');
        return {
            smsTotal,
            callTotal,
            grandTotal: grandTotal()
        }
    }

    function hasReachedWarningLevel() {
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel &&
            total < criticalLevel
        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        const total = grandTotal();

        return total >= criticalLevel()
    }

    function totalClassName() {
        if (hasReachedCriticalLevel1()) {
            return 'danger'
        }


        if (getTotalCost() >= getWarningLevel()) {
            return 'warning'
        }



    }
    return {
        totalClassName,
        recordAction,
        totals,
        setSettings,
        getSettings,
        actions,
        actionsFor,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        setCriticalLevel,
        calcBill,
        getTotalCallCost,
        getTotalSmsCost,
        getCriticalLevel,
        getWarningLevel,
        makeCall,
        sendSms,
        getTotalCost,
        hasReachedCriticalLevel1

    }
}
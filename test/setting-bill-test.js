let assert = require("assert");
let SettingsBill = require("../settings-bill");

describe('The bill with settings factory function', function() {
    it('should be able to set the call cost', function() {
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.85);

        assert.ok(1.85, settingsBill.getCallCost());

        let settingsBill2 = SettingsBill();
        settingsBill2.setCallCost(2.75);
        assert.ok(2.75, settingsBill2.getCallCost());
    })
    it('should be able to set the sms cost', function() {
        let settingsBill = SettingsBill();

        settingsBill.setSmsCost(1.85);
        assert.ok(1.85, settingsBill.getSmsCost());

        let settingsBill2 = SettingsBill();
        settingsBill2.setSmsCost(2.75);
        assert.ok(2.75, settingsBill2.getSmsCost());
    })
    it('should be able to set the sms and call cost', function() {
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(2.75);
        settingsBill.setSmsCost(0.85);

        assert.ok(0.85, settingsBill.getSmsCost());
        assert.ok(2.75, settingsBill.getCallCost());

        let settingsBill2 = SettingsBill();
        settingsBill2.setCallCost(1.75);
        settingsBill2.setSmsCost(0.35);

        assert.ok(0.35, settingsBill2.getSmsCost());
        assert.ok(1.75, settingsBill2.getCallCost());
    })
    it('should be able to set the warning level', function() {
        let settingsBill = SettingsBill();

        settingsBill.setWarningLevel(20);

        assert.ok(20, settingsBill.getWarningLevel());



    })
    it('should be able to set the Critical level', function() {
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(30);

        assert.ok(30, settingsBill.getCriticalLevel());



    })
    it('should be able to set the Warning and Critical level ', function() {
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setWarningLevel(15);

        assert.ok(15, settingsBill.getWarningLevel());
        assert.ok(10, settingsBill.getCriticalLevel());


    })
});
describe('use values', function() {
    it('should be able to use the call cost set', function() {
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost(0.85);



        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.ok(6.75, settingsBill.getTotalCost());
        assert.ok(6.75, settingsBill.getTotalCallCost());
        // assert.ok(0.00, settingsBill.getTotalSmsCost());
    });

    it('should be able to use the call cost set for 2 calls t 1.35', function() {
        let settingsBill = SettingsBill();


        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);

        settingsBill.makeCall();
        settingsBill.makeCall();


        assert.ok(2.70, settingsBill.getTotalCost());
        assert.ok(2.70, settingsBill.getTotalCallCost());

    });
    it('should be able to send 2 sms`s at 0.85 each', function() {
        let settingsBill = SettingsBill();

        // settingsBill.setCriticalLevel(10);
        // settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);


        settingsBill.sendSms();
        settingsBill.sendSms();


        assert.ok(1.70, settingsBill.getTotalCost());
        assert.ok(1.70, settingsBill.getTotalSmsCost());
    });
    it('should be able to send 2 sms`s at 0.85 each and make 1 call 1.35 each', function() {
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);

        settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.sendSms();


        assert.ok(3.05, settingsBill.getTotalCost());
        assert.ok(1.35, settingsBill.getTotalCallCost());
        assert.ok(1.70, settingsBill.getTotalSmsCost());
    });
    describe('warning & critical level', function() {
        it('should return a class name of "warning" if the warning level is reached ', function() {
            let settingsBill = SettingsBill();

            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(5);
            settingsBill.setCriticalLevel(10);


            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();


            assert.ok('warning', settingsBill.totalClassName());


        });
        it('should return a class name of "critical" if the critical level is reached ', function() {
            let settingsBill = SettingsBill();

            settingsBill.setCallCost(2.50);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(10);

            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();


            assert.ok('danger', settingsBill.totalClassName());


        });
        it('should stop the Total call cost from increasing when the critical level has been reached', function() {
            let settingsBill = SettingsBill();

            settingsBill.setCriticalLevel(10);
            settingsBill.setCallCost(2.50);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(10);

            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();


            assert.ok('danger', settingsBill.totalClassName());
            assert.ok('danger', settingsBill.totalClassName());


        });
        it('should allow the total to increaseafter reashing the critical level & then upping the critical level', function() {
            let settingsBill = SettingsBill();

            settingsBill.setCriticalLevel(10);
            settingsBill.setCallCost(2.50);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(10);

            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();


            assert.ok('danger', settingsBill.totalClassName());


            settingsBill.setWarningLevel(20);
            assert.ok('danger', settingsBill.totalClassName());
            settingsBill.makeCall();
            settingsBill.makeCall();
            assert.ok('danger', settingsBill.totalClassName());

        });
    });
});
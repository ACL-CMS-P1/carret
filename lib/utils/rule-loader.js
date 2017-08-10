const Rule = require('../models/rule');

let rule1 = {
    name: 'rule1',
    status: 'on',
    description: 'Requires risk score less than 80'
};

const rule1fxn = function (riskScore, status) {
    if (!status) return 'skip';
    riskScore >= 80 ? false : true;
};

let rule2 = {
    name: 'rule2',
    status: 'on',
    description: 'Fails on three login attempts'
};

const rule2fxn = function (loginAttempts, status) {
    if (!status) return 'skip';
    loginAttempts > 2 ? false : true;
};

const ruleLoader = {

    ruleList: [],

    saveRule: function (rule) {
        const newRule = new Rule(rule);
        newRule
            .save()
            .then(returned => {
                rule._id = returned._id;
                rule.__v = returned.__v;
                this.ruleList.push(rule);
                return rule;
            });
    },

    saveRulesInDB: function () {
        return Promise.all([
            this.saveRule(rule1),
            this.saveRule(rule2)
        ])
            .then(() => {
                rule1.fxn = rule1fxn;
                rule2.fxn = rule2fxn;
            })
            .catch(console.log);
    }
};

module.exports = ruleLoader;
define(function(require) {
    var PropertySet = require('AXON/PropertySet');
    var inherit = require('PHET_CORE/inherit');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');
    var BeakerModel = require('ELECTROLYSIS/electrolysis/model/Beaker');
    var ElectrodeSlotModel = require('ELECTROLYSIS/electrolysis/model/Electroplating/ElectrodeSlotModel');


    function CircuitModel() {
        PropertySet.call(this, {
            open: true,
            bulbGlows: false,
            switchedOn: false
        });
        this.beakerLocation = new Vector2(178, 339);
        this.beakerSize = new Dimension2(120, 80);
        this.beakerColor = 'Aqua';

        this.anodeSlot = new ElectrodeSlotModel({location: new Vector2(199,322)});
        this.cathodeSlot = new ElectrodeSlotModel({location:new Vector2(274,322)});

        this.checkCurrentFlow = function() {
            this.bulbGlowsProperty.set(this.check() && this.beaker.electrolyte.conductor);
        }.bind(this);

        this.check = function() {
            return !this.open && this.beaker.electrolyte && this.anodeSlot.electrode && this.cathodeSlot.electrode;
        }.bind(this);

        this.onReceiveDrop = function(liquid) {
            this.electrolyteProperty.set(liquid);
        }.bind(this);

        this.openProperty.link(function() {
            this.checkCurrentFlow();
        }.bind(this));

        var option = {
            location: new Vector2(151,300),
            liquidFillLocation: new Vector2(15, 30),
            liquidFillSize: new Dimension2(150, 100),
            parent: this
        };
        this.beaker = new BeakerModel(option);

    }

    return inherit(PropertySet, CircuitModel);
});
import Ember from 'ember';

export default Ember.Controller.extend({
    pubyear: 0,
    page: 1,
    queryParams: ['pubyear','pubtype','page', 'only_delayed'],
    needs: ['publications'],
    only_delayed: false,
    pubyears: Ember.computed(function(){      
      return [
        {pubyear: this.t('biblreview.selectPublicationYearPrompt'), id: 0},
        {pubyear: moment().year()   + ' ' + this.t('biblreview.orLater'), id: 1},
        {pubyear: moment().year()-1, id:moment().year()-1},
        {pubyear: moment().year()-2, id:moment().year()-2},
        {pubyear: moment().year()-3, id:moment().year()-3},
        {pubyear: moment().year()-4, id:moment().year()-4},
        {pubyear: moment().year()-5 + ' ' + this.t('biblreview.orEarlier'), id:-1}
      ];
    })

});




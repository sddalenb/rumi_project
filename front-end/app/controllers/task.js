import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    enterComment() {
      let message = $("input")[0].value;

      this.get('store').findRecord('user',this.get("session").get("currentUser").id).then((user) => {
        let comment = this.get("store").createRecord("comment",{
          task: this.get("model"),
          user: user,
          message: message,
          postDate: new Date()
        });
        $("input")[0].value = "";
        comment.save().then((comment)=>{
          this.get('store').query('comment',{task: comment.belongsTo('task').id()}).then((comments)=>{
            this.set('comments',comments);
          });
        });
      });
    }
  }
});

import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty }  from '@ember/utils';

export default Controller.extend({

  needToUpdate: computed('claims.[]',function(){
    if(!isEmpty(this.get('claims')))
      return this.get('claims').filter((cliam)=> !claim.get('answered'));
  }),
  excuse: '',

  actions:{
    openClaimDialog(claim){
      this.set('claimDialogOpen', true);
      this.set('displayTask',claim);
    },

    openVoteDialog(poll){
      this.set('voteDialogOpen',true);
      this.get('store').query('claim',{task: poll.belongsTo('task').id()}).then((claims)=>{
        this.set('excuses',claims);
      })
    },

    willTakeTask(claim){
      claim.get('task').then((task)=>{ // find the task in question and assign to user

        task.set('assignee', this.get('model'));
        task.save();
        this.get('store').query('claim',{task: task.id}).then((claims)=>{// find all claims associated to this claim and delete
          claims.forEach((claim)=>{
            claim.deleteRecord();
            claim.save();
          });
        });
      });
    },

    rejectTask(claim){
      this.set('refuseDialogOpen',true);
    },

    confirmReject(claim, excuse){
      claim.set('reason',excuse);
      claim.set('answered',true);
      claim.save();
      this.set('excuse','');
      this.get('store').query('claim',{task: claim.belongsTo('task').id()}).then((claims)=>{
        if(claims.isEvery('answered')){
          claims.objectAt(0).get('task').then((task)=>{
            this.get('store').query('user',{group: task.belongsTo('group').id()}).then((users)=>{
              users.forEach((user)=>{
                let poll = this.get('store').createRecord('poll',{
                  user: user,
                  task: task,
                });
                poll.save(); // make four claims to this task
              });
            });
          });
        }
      });
    },


  }
});

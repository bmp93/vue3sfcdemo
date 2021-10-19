<template>
  <div class="hello">
    sorting dir : {{sortDir}}
    <table>
        <thead>
            <tr>
                <th><a href="#" @click="sort('name')" :class="{active: sortKey == 'name'}">Name</a></th>
                <th><a href="#" @click="sort('dob')" :class="{active: sortKey == 'dob'}">DOB</a></th>
                <th><a href="#" @click="sort('email')" :class="{active: sortKey == 'email'}">Email</a></th>
                <th>Phone</th>
                <th>Photo</th>
            </tr>
        </thead>
        <tbody>
            <custom-row v-for="user in flattenUsers" :key="user.name">
                <td>{{user.name}}</td>
                <td>{{DateFormat.methods.setDate(user.dob)}}</td>
                <td>{{user.email}}</td>
                <td>{{user.phone}}</td>
                <td><img :src="user.photo" alt="image"></td>
            </custom-row>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import userService from '@/services/userService';

import CustomRow from '@/components/CustomRow.vue';
import DateFormat from "@/mixins/date-format";

let users: any = ref(null);
let flattenUsers = ref(new Array<any>());
let sortDir = ref('asc');
let sortKey = ref('name');

onMounted(async () => {
    users.value = await userService.getAll().then(res => {  return res });
    users.value.forEach((userDetail: any) => {
      const detail = {} as any;
      detail.name = userDetail.name.first + ' ' + userDetail.name.last;
      detail.phone = userDetail.phone; 
      detail.email = userDetail.email;
      detail.dob = userDetail.dob.date;
      detail.photo = userDetail.picture.thumbnail;
      flattenUsers.value.push(detail);    
    });
    flattenUsers.value = sortByKey(flattenUsers.value, sortKey.value);
    sort(sortKey.value);
    console.log(flattenUsers.value);
})

const sort = (key: any) => {
  if(sortKey.value == key) {
    flattenUsers.value = flattenUsers.value.reverse();
  } else {
    sortKey.value = key; 
    flattenUsers.value = sortByKey(flattenUsers.value, key);
  }
  sortDir.value = sortDir.value == 'desc' ? 'asc' : 'desc';
}

const sortByKey = (array: any, key: any) => {
    return array.sort(function(a: any, b: any) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

var compareDate = function (u1: any, u2: any) {  
    var emp1Date = new Date(u1.date).getTime();  
    var emp2Date = new Date(u2.date).getTime();  
    return emp1Date > emp2Date ? 1 : -1;    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

a {
  font-weight: normal;
  color: blue !important;
}

a.active {
  font-weight: bold;
  color: red !important;
}
</style>

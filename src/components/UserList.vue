<template>
  <div class="hello">
    sort on: {{sortKey}}  && sorting dir : {{ sortDir }} 
    <table>
      <thead>
        <tr>
          <th>
            <a href="#" @click="sort('name')" :class="{ active: sortKey == 'name' }">Name</a>
          </th>
          <th>
            <a href="#" @click="sort('dob')" :class="{ active: sortKey == 'dob' }">DOB</a>
          </th>
          <th>
            <a href="#" @click="sort('email')" :class="{ active: sortKey == 'email' }">Email</a>
          </th>
          <th>Phone</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <custom-row v-for="user in flattenUsers" :key="user.name">
          <custom-column>{{ user.name }}</custom-column>
          <custom-column>{{ DateFormat.methods.setDate(user.dob) }}</custom-column>
          <custom-column>{{ user.email }}</custom-column>
          <custom-column>{{ user.phone }}</custom-column>
          <custom-column>
            <img :src="user.picture" alt="image" />
          </custom-column>
        </custom-row>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import userService from '@/services/userService';

import CustomRow from '@/components/CustomRow.vue';
import CustomColumn from '@/components/CustomColumn.vue';
import DateFormat from "@/mixins/date-format";

import { UserDetail, FlattenUserDetail } from "@/models/model"

let users = ref(new Array<UserDetail>());
let flattenUsers = ref(new Array<FlattenUserDetail>());
let sortDir = ref('asc');
let sortKey = ref('name');

onMounted(async () => {
  users.value = await userService.getAll().then((res: Array<UserDetail>) => { return res });
  users.value.forEach((userDetail: UserDetail) => {
    flattenUsers.value.push(new FlattenUserDetail(userDetail.gender,
      userDetail.name.first + ' ' + userDetail.name.last,
      userDetail.email,
      userDetail.phone,
      userDetail.dob.date,
      userDetail.picture.thumbnail));
  });
  flattenUsers.value = sortByKey(flattenUsers.value, sortKey.value);
  sort(sortKey.value);
  console.log(flattenUsers.value);
})

const sort = (key: string) => {
  if (sortKey.value == key) {
    flattenUsers.value = flattenUsers.value.reverse();
  } else {
    sortKey.value = key;
    flattenUsers.value = sortByKey(flattenUsers.value, key);
  }
  sortDir.value = sortDir.value == 'desc' ? 'asc' : 'desc';
}

const sortByKey = (array: Array<FlattenUserDetail>, key: string) => {
  return array.sort(function (a: FlattenUserDetail, b: FlattenUserDetail) {
    const x = a[key as keyof FlattenUserDetail]; const y = b[key as keyof FlattenUserDetail];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
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

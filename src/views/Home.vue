<template>
  <div class="home">
    <v-container fluid>
      <v-card width="344" class="pa-3">
        <v-text-field v-if="!firstName"
          label="Keresztnév"
          outlined>
        </v-text-field>
        <v-text-field v-else :value="firstName"
          label="Keresztnév"
          outlined>
        </v-text-field>
        <v-text-field  v-if="!lastName"
          label="Vezetéknév"
          outlined>
        </v-text-field>
        <v-text-field v-else :value="lastName"
          label="Vezetéknév"
          outlined>
        </v-text-field>
        <v-textarea
          label="Ez a bajom"
          outlined>
        </v-textarea>
        <v-checkbox
          :label="'Tudomásul veszem hogy nem érdekel titeket'"
        ></v-checkbox>
        <v-switch
          :label="'Hírlevél azért jöhet'"
        ></v-switch>
        <div class="d-flex flex-row-reverse">
          <v-btn color="success">
            Küldés
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters('user', ['firstName', 'lastName']),
  },
}
</script>

<template>
  <div>
    <v-toolbar app>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>About This Tool</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <div class="headline">What is it?</div>
              </v-card-title>
              <v-card-text>
                This is a program to help you figure out how cool an Evaporative cooler can cool your home.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<template>
<div>
  <v-app-bar app>
    <v-btn icon @click="$router.go(-1)">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>About This Tool</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-main>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-8">
            <v-card-title primary-title>
              <div class="headline">What is it?</div>
            </v-card-title>
            <v-card-text>
              <p>
                This is a program to help you figure out how cool an evaporative cooler can cool your home.
              </p>
              <p>
                I built this tool because I was tired of looking up the weather, then finding a cooling chart online
                to figure out how much cooler my "swamp cooler" could cool my home. Additionally, I wanted to
                see what all the hype surrounding progressive web applications was about.
              </p>
              <p>
                So here we are. A tool that works offline in all modern browsers and tells you how
                much cooler a big fan and some wet cardboard (or straw) could make your home.
              </p>
              <p>
                Enjoy :)
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="elevation-8">
            <v-card-title primary-title>
              <div class="headline">How does it work?</div>
            </v-card-title>
            <v-card-text>
              <p>
                At first I thought I would try to use the real math to figure out the temperature
                difference given your humidity and current temperature by calculating the wet bulb temperature.
                That turned out to be:
                <ol>
                  <li>
                    Very complicated mathematically
                  </li>
                  <li>
                    Not very accurate
                  </li>
                </ol>
              </p>

              <p>
                The variables around trying to figure out how efficient any given cooler will
                work in any given house are numerous and hard to predict.
              </p>
              <p>
                Enough rambling though, what I actually did was try some educated guesses at an equation that was close,
                compare it to the actual output at my house and the online charts, and refine until it was "good enough".
              </p>
              <p>
                That looks something like this:
              </p>
                <code>maxDecrease = temperature * .33</code><br />
                <code>lossCoefficient = when humidity > 50 then 1.1 else 1.5</code><br />
                <code>effeciencyLoss = humidity * lossCoefficient</code><br />
                <code>actualDecrease = maxDecrease - (maxDecrease * (effeciencyLoss / 100))</code><br />
                <code>outputTemperature = ceiling(temperature - actualDecrease)</code>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</div>
</template>
<style scoped>
code {
  white-space: normal;
  overflow: auto;
}
</style>

<template>
    <v-row class="pt-12">
      <v-col cols="6" class="mr-12">
        <v-img src="dapper.JPG" class="elevation-12" />
        <p class="text-caption" style="font-family: 'JetBrains Mono' !important;">Me (right) and my buddy (left) looking dapper at our senior Model United Nations conference B]</p>
      </v-col>
      <v-col cols="4" class="ml-12">
        <h1 class="text-h4 mb-4 grey--text text--lighten-2" style="font-family: 'Aleo' !important;">Hey! I'm Zavier.</h1>
        <p class="grey--text text--lighten-1 mb-4" style="font-family: 'Aleo' !important; font-size: 19px;">I am currently a college freshman studying computer science at <b style="color: #FF8200; font-family: 'Inter' !important;">UTK</b>.</p>
        <p class="grey--text text--lighten-1" style="font-family: 'Aleo' !important; font-size: 19px;">I have been building websites for over 8 years and learning more traditional programming for about 6. Currently, I work as a junior frontend developer at ResaleAI. Outside of programming I love almost any and everything, including (but not limited to): 3D modeling and art, graphic design, motion graphics, astronomy, and stand-up comedy.</p>
        <p class="grey--text text--lighten-1" style="font-family: 'Aleo' !important; font-size: 19px;">On my personal site (this one) you can find the projects I am most proud of, and a journal of my technical, personal, and academic reflections.</p>
        <v-btn text style="font-family: 'JetBrains Mono'; text-transform: none;" class="px-0" color="primary" :ripple="false" href="Resume-SEPT2020.pdf" download>Peep the Resume</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {

}
</script>

<style>
.v-btn:hover, .v-btn::before, .v-btn:active {
    background-color: transparent;
    text-shadow: 0 0 4px;
  }
  b {
    font-family: 'JetBrains Mono';
    text-shadow: 0 0 4px #000;
    /* font-weight: 600; */
  }
  h1 {
    font-family:'JetBrains Mono';
    font-weight: 400;
  }

  h2 {
    font-family: 'Chakra Petch';
    font-size: 40px;
    font-weight: 400;
  }
</style>
<script>
export default {
    name: "ProjectsPage",
    data: () => ({
      selectedProject: null,
    })
}
</script>

<template>
  <v-row class="justify-center pt-8">
<h1>WIP</h1>
    <v-col cols="12" class="text-center pb-8">
  <h1 style="font-family: 'Chakra Petch' !important;" class="text-h3 text-md-h2">Featured</h1>
    </v-col>
    <v-col cols="auto">
      <v-hover v-slot="{ hover }">
      <v-card color="background" elevation="0" style="transition: .3s ease-out; cursor: pointer; color: #aaa;" class="pa-4" @click="selectedProject = 0" :ripple="false">
        <v-responsive :aspect-ratio="1" >
        <v-card-text :style="`white-space: pre; font-family: 'JetBrains Mono' !important; line-height: 15px; transition: .3s ease-out; font-size: 11px;${hover ? 'text-shadow: 0 0 4px;' : ''}`" :class="`${hover ? 'white--text' : ''}`">

        ;gKKMMMMMMMMMMMMMMMRKKWp
      ;KK*                    *0Kp
     ]KM                        YKW
    #KM                          ?KN
  ,#KL       \\//       \\//      'KK,
 yKR`        //\\       //\\        9Kp
]KM      #p                  j#p     *KN
KM      JKN      KMYYYK      ]KH      ]KH
9Kw     JKN     KK    KK     ]KH     yKK
 ?KKKKKKKKN       KKMK       ]KKKKKKKRC
        JKN                  ]KH
         KN       yKKw       ]KH
          VKNwwg#K    KNmuuuKR*
                 ``--``
</v-card-text>
<v-card-text class="text-center">
          <p :style="`font-family: 'JetBrains Mono'; font-size: 18px; transition: .3s ease-out; ${hover ? 'text-shadow: 0 0 4px; color: #fff;' : ''}`">Blind Dog</p>
        </v-card-text>
        </v-responsive>
      </v-card>
      </v-hover>
    </v-col>
    <!-- <v-col cols="auto">
      <v-hover v-slot="{ hover }">
      <v-card color="background" :elevation="hover ? 12 : 0" style="transition: .3s ease-out; cursor: pointer; color: #aaa;">
        <v-responsive :aspect-ratio="1" >
        <v-card-text :style="`white-space: pre; font-family: 'JetBrains Mono' !important; line-height: 14px; transition: .3s ease-out; font-size: 11px; ${hover ? 'color: #0091ea; text-shadow: 0 0 4px;' : ''}`">
         
                       ,wpKKKbbKKKpw,             
                   ,pKPPPPPPPPPPPPPPPPKp          
                 ,#PPPPPK*"``,,``"*KPPPPPKp       
                #PPPPM^,pKhPPPPPE    `TPPPPK      
              .KPPPK`,KPPPPPPPPPPp   ,p`0PPPh     
              KPPK" '``    ``"TC``````"b VPPPhppp-      
             ;PM`,    "KKb      b      Pb PPPPK"  
             " ,#P    ,bPKM     ]      PP UPM`,   
             /KPPP "``  ,,p     ]      PM M ,#M   
          ,phPPPPPb    KPP"     ]      b  /KPP    
              `PPPPb      ,p    !       /hPPPP    
               `bPPPKp  wpPPbpwwwbpp~ ,KPPPP"     
                 TPPPPPbw,`""***"`,,pbPPPPM       
                   "KPPPPPPhKKKKhPPPPPPK*         
                      "TKPPPPPPPPPPKM"`
                           ``````     

        </v-card-text>
        <v-card-text class="text-center">
          <p :style="`font-family: 'JetBrains Mono'; font-size: 18px; transition: .3s ease-out; ${hover ? 'text-shadow: 0 0 4px; color: #0091ea;' : ''}`">ResaleAI</p>
        </v-card-text>
        </v-responsive>
      </v-card>
      </v-hover>
    </v-col>
    <v-col cols="auto">
      <v-hover v-slot="{ hover }">
      <v-card color="background" :elevation="hover ? 12 : 0" style="transition: .3s ease-out; cursor: pointer; color: #aaa;">
        <v-responsive :aspect-ratio="1" >
        <v-card-text :style="`white-space: pre; font-family: 'JetBrains Mono' !important; line-height: 14px; transition: .3s ease-out; font-size: 11px; ${hover ? 'color: #0091ea; text-shadow: 0 0 4px;' : ''}`">
                    

                       DDKFFFFFFFFF#D                 
                       MDDDN#FFFFFFFFFkD              
                             DNFFFFFFFFFk             
                            DKVDNFFFFFFFkKVD          
                          DFFFFFWDD##NFFFFFFkD          
                       DDFFFFFFFND   KFFFFFFN         
                     DKFFFFFFFND      DNFFD           
                   DKFFFFFFFD                         
                 D4FFFFFFFD                          
               DFFFFFFF#D                             
            DDFFFFFFFND                               
           KFFFFFFFND                                 
           FFFFFFD                                    
           DNRND   


        </v-card-text>
        <v-card-text class="text-center">
          <p :style="`font-family: 'JetBrains Mono'; font-size: 18px; transition: .3s ease-out; ${hover ? 'text-shadow: 0 0 4px; color: #0091ea;' : ''}`">HAMMERTIME</p>
        </v-card-text>
        </v-responsive>
      </v-card>
      </v-hover>
    </v-col> -->
    <v-col cols="12" class="text-center mt-12">
      <h1 style="font-family: 'Chakra Petch' !important;" class="text-h3 text-md-h2">Archive</h1>
    </v-col>
  </v-row>
</template>
<style>
.v-btn:hover, .v-btn::before, .v-btn:active, .v-card::before {
    background-color: transparent;
    text-shadow: 0 0 4px;
  }
.v-card-text {
  color: #000 !important;
}
</style>
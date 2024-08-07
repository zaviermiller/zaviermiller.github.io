export const featuredLogos = {
  computed: {
    receiptComponentsLogo() {
      return `
            ___              _      __          
           / _ \\___ _______ (_)__  / /_         
          / , _/ -_) __/ -_) / _ \\/ __/         
  _____  /_/|_|\\__/\\__/\\__/_/ .__/\\__/    __    
 / ___/__  __ _  ___  ___  /_/  ___ ___  / /____
/ /__/ _ \\/  ' \\/ _ \\/ _ \\/ _ \\/ -_) _ \\/ __(_-<
\\___/\\___/_/_/_/ .__/\\___/_//_/\\__/_//_/\\__/___/
              /_/                               `
    },
    receiptComponentsThumbLogo() {
      return `

       ___  _____
      / _ \\/ ___/
     / , _/ /__  
    /_/|_|\\___/  
                 `
    },
    zenLogo() {
      return `

     ____         
    /_  / ___ ___ 
     / /_/ -_) _ \\     
    /___/\\__/_//_/

 
 
            `
    },
    zenPageLogo() {
      return `
 ____         
/_  / ___ ___ 
 / /_/ -_) _ \\
/___/\\__/_//_/
`
    },
    zenPageMobileLogo() {
      return `
   ____         
  /_  / ___ ___ 
   / /_/ -_) _ \\     
  /___/\\__/_//_/
          `
    },
    raiLogo() {
      return `
             ,wpKKKbbKKKpw,             
         ,pKPPPPPPPPPPPPPPPPKp          
       ,#PPPPPK*"\`\`,,\`\`"*KPPPPPKp       
      #PPPPM^,pKhPPPPPE    \`TPPPPK      
    .KPPPK\`,KPPPPPPPPPPp   ,p\`0PPPh     
    KPPK" '\`\`    \`\`"TC\`\`\`\`\`\`"b VPPPhppp-
   ;PM\`,    "KKb      b      Pb PPPPK"  
   " ,#P    ,bPKM     ]      PP UPM\`,   
   /KPPP "\`\`  ,,p     ]      PM M ,#M   
,phPPPPPb    KPP"     ]      b  /KPP    
    \`PPPPb      ,p    !       /hPPPP    
     \`bPPPKp  wpPPbpwwwbpp~ ,KPPPP"     
       TPPPPPbw,\`""***"\`,,pbPPPPM       
         "KPPPPPPhKKKKhPPPPPPK*         
            "TKPPPPPPPPPPKM"\`
                 \`\`\`\`\`\`     
            
                 
`
    },
    bdLogo() {
      return `
        
        ;gKKMMMMMMMMMMMMMMMRKKWp
      ;KK*                    *0Kp
     ]KM                        YKW
    #KM                          ?KN
  ,#KL       \\\\//       \\\\//      'KK,
 yKR\`        //\\\\       //\\\\        9Kp
]KM      #p                  j#p     *KN
KM      JKN      KMYYYK      ]KH      ]KH
9Kw     JKN     KK    KK     ]KH     yKK
 ?KKKKKKKKN       KKMK       ]KKKKKKKRC
        JKN                  ]KH
         KN       yKKw       ]KH
          VKNwwg#K    KNmuuuKR*
                 \`\`--\`\``
    },
    zimaLogo() {
      return `


  ____    __ __  ___ 
 |_  / _ |  \\  \\| . |
  / / |_||     ||   |
 /___||_||_|_|_||_|_|
 `
    },
    logos() {
      return {
        "receipt-components": this.receiptComponentsLogo,
        zen: this.zenPageLogo,
        zima: this.zimaLogo,
        "resale-ai": this.raiLogo,
        "blind-dog": this.bdLogo,
      }
    },
    mobileLogos() {
      return {
        "receipt-components": this.receiptComponentsLogo,
        zen: this.zenPageMobileLogo,
        "resale-ai": this.raiLogo,
        "blind-dog": this.bdLogo,
      }
    },
    thumbLogos() {
      return {
        "receipt-components": this.receiptComponentsThumbLogo,
        zen: this.zenLogo,
        zima: this.zimaLogo,
        "resale-ai": this.raiLogo,
        "blind-dog": this.bdLogo,
      }
    },
  },
}

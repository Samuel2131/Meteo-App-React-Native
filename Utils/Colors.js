
const defaultColor = {
   headerColor: '#006400',
   refreshColor:'#7cfc00',
}

const Theme = {
   theme:{
     colors:{
      background: "",
      border: "",
      card: "",
      notification: "",
      primary: "",
      text: "",
     },
     dark:"",
   },
   setTheme: (newTheme) => {Theme.theme = newTheme},
};

export {Theme, defaultColor};
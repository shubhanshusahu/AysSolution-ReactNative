import { GetReq } from "../../apiCalls/api";

const initialState = {
  user: null,
  dashboard: null,
  listPageHeading: 'Leads',
  ads: []
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LeadOff':
      // alert('here '+JSON.stringify(action.data))
      return {
        ...state,
        lead: action.data
      };
      break;
    case 'LeadRem':
      return {
        leadRem: action.data
      }
      break;
    case 'selectlead':
      return {
        ...state,
        selectedlead: action.data
      }
      break;
    case "login":
      return {
        ...state, user: action.data
        // {'user' : action.data}
      }
      break;
    case 'leads':
      return {
        ...state,
        'leads': action.data
      }
      break;
    // case 'fetchleads':
    //   return {
    //     ...state,
    //     'leads': await GetReq('/leads')
    //   }
      case 'setDashboardAdmin':
      return {
        ...state,
        'dashboard': action.data
      }
      case 'setlistPageHeading':
      return {
       ...state,
        'listPageHeading': action.data
      }
      case 'saveAds':
        return {
         ...state,
          'ads': action.data
        }
    default:
      return state

  }
}
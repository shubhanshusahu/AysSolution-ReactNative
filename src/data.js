import axios from "axios";

export default data = [
    {
        id: 'P1',
        title: 'Kanyadan Policy',
        img: "https://images.astroyogi.com/astroyogi2017/hindi/images/astrology/banner/kanyadan_ceremony.jpg"
    },
    {
        id: 'P2',
        title: 'Education Policy',
        img: "https://blog.ipleaders.in/wp-content/uploads/2020/11/national-educational-policy.jpg"
    },

    {
        id: 'P3',
        title: 'Retirement Fund Policy',
        img: require("../assets/policy/retire.png")
    },
    {
        id: 'P4',
        title: 'Pension Policy',
        img: "https://img.theweek.in/content/dam/week/news/biz-tech/images/2019/2/1/pension-plan.jpg"
    },
    {
        id: 'P5',
        title: 'Mediclaim Policy',
        img: "https://www.maxlifeinsurance.com/static-page/assets/homepage/Difference_Between_Mediclaim_And_Health_Insurance_2_752e5ea820.webp"
    },
    {
        id: 'P6',
        title: 'Personal Accident Policy',
        img: "https://images.moneycontrol.com/static-mcnews/2018/10/insurance-contract-1280x720.jpg?impolicy=website&width=1600&height=900"
    },
    {
        id: 'P7',
        title: 'Cancer cover Policy',
        img: "https://www.hdfcsales.com/blog/wp-content/uploads/2021/02/how-to-get-the-most-of-your-cancer-insurance-policy.jpg"
    },
    {
        id: 'P8',
        title: 'Family Health Policy',
        img: "https://img.freepik.com/free-photo/arrangement-family-concept-with-copy-space_23-2148485793.jpg?w=826&t=st=1714828215~exp=1714828815~hmac=bc32f609bcb1ce319c790b5a0fd7c2ffcfb7bcca7c59336ccd8933292c4fcbaf"
    },
    {
        id: 'P9',
        title: 'Term Policy',
        img: "https://ethicalinsurance.in/wp-content/uploads/2022/09/02_Term-Insurance.jpg"
    },
];
export const BaseUrl ='https://ays-backend1.vercel.app/'
// export const BaseUrl = 'https://aysbackend.onrender.com'
// export const BaseUrl = 'https://aysbackend.onrender.com'
// export const BaseUrl = 'https://94ae-203-212-251-167.ngrok-free.app/'


// export const BaseUrl ='https://9b56-2405-201-300d-e0d4-249a-75a8-87d5-4c59.ngrok-free.app'
export const lightTheme = {
    primary: "#ffffffff",
    Secondary: '#000',
    button: '#000',
    blue: '#002df7',
    success: '#00ff62de',
    darkSuccess: '#197b3fff',
    warning: '#ffa6006f',
    close: '#ff040077',
    lightGrey: '#d3d3d37b',
    grey: '#656565ff'
}
export const statuses = ["Applied", "Call not picked", "Not Reachable", "Not interested", "Interested", "In Progress"
    , "Follow up", "Converted", "Closed", "Property not approved", "Profile not matched", "Sanctioned"
]


export const statusColor = {
    "Applied": '#cfe3e16d', "Call not picked": '#afc9c7', "Not Reachable": '#00ffe552', "Not interested": '#ff7b004a', "Interested": '#00ffd074', "In Progress": '#c0ff015f'
    , "Follow up": '#b6bffa', "Converted": '#19f900a1', "Closed": lightTheme.lightGrey, "Property not approved": '#e9a5a595', "Profile not matched": '#ff2a0052', "Sanctioned": "#00ff4050"
}
export const Loandata = [
    {
        id: 'L1',
        title: 'Personal Loan',
        img: "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/blog/personal-loan/personal-loan-eligibility-criteria-717x404.jpg"
    },
    {
        id: 'L2',
        title: 'Business Loan',
        img: "https://redfortcapital.com/wp-content/uploads/2024/06/Business-Loan.jpg"
    },
    {
        id: 'L8',
        title: 'Education Loan',
        img: "https://images.moneycontrol.com/static-mcnews/2022/06/Education-Loan_pic.jpg?impolicy=website&width=1600&height=900"
    },
    {
        id: 'L3',
        title: 'Home Loan',
        img: "https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?size=626&ext=jpg"
    },
    {
        id: 'L4',
        title: 'Plot Loan',
        img: "https://m.economictimes.com/thumb/msid-84168616,width-1200,height-900,resizemode-4,imgsize-248670/land-loan-vs-home-loan.jpg"
    },
    {
        id: 'L5',
        title: 'Top-Up Loan',
        img: require('../assets/loans/topup.png')
    },
    {
        id: 'L6',
        title: 'Mortgage Loan',
        img: "https://5.imimg.com/data5/KI/EJ/WI/SELLER-21013186/mortgage-loans-service-500x500.jpg"
    },
    {
        id: 'L7',
        title: 'Loan Transfer',
        img: "https://basichomeloan.com/admin/uploads/banner/Banner_when_balance_transfer.jpg"
    },

]
export const adNote =  'For more details contact us 9201100195 '
export const LoanInfo = `Convert per lead paying amount Rs. 300/- Next month Date 10th - 15th\.

*Required documents and conditions:-*

1. Minimum loan amount 3 lac.
2. Maximum loan amount depend as per customer profile.
3. Kyc- aadhar card, pancard, address proof and passport photo.
4. Income proof - 03 month salary slip/ ITR, Gumasta.
5. 06 month current bank statement.`

export const PolicyInfo = `Convert per lead paying  amount Rs. 300/- Next month Date 10th - 15th.

*Required documents and conditions:-*

1. Minimum Premium Qty Rs. 1500/- for S.A.1 lac.
2. Maximum premium depends as per customer paying capability.
3. Kyc- aadhar card, pancard and passport photo.`

export const UploadImage = async (img) => {
    // console.log(img, 'image going to upload is this')
    let filename = img.split('/').pop();
    var match = /\.(\w+)$/.exec(filename);
    let type = match ? img / match[1] : img;
    let imageData = new FormData()
    imageData.append("file", { uri: img, name: filename, type})
    imageData.append("upload_preset", "aysmaster")
    imageData.append("cloud_name", "dngvh3o0g")
    let API_URL = 'https://api.cloudinary.com./v1_1/dngvh3o0g/image/upload';
    try {
        let res = await axios.post(API_URL, imageData)
        // console.log(res, 'photo saved to cloudinary');
        if (res.status == 200) {
            return res.data.url
        }
        else {
            // console.log('Error in uploading image')
            return ''
        }
    }
    catch (e) {
        // console.log(e, 'error in uploading image to cloudinary');
    }
}

export const UploadStudentImg = async (img) => {
    // console.log(img)
    let data = new FormData()
    data.append("file", img)
    data.append("upload_preset", "aysmaster")
    data.append("cloud_name", "dngvh3o0g")
    let API_URL = 'https://api.cloudinary.com./v1_1/dngvh3o0g/image/upload';
    try {
        let res = await axios.post(API_URL, data)
        // console.log(res, 'photo saved to cloudinary');
        if (res.status == 200) {
            return res.data.url
        }
        else {
            // console.log('Error in uploading image')
            return ''
        }
    }
    catch (e) {
        // console.log(e, 'error in uploading image to cloudinary');
    }
}
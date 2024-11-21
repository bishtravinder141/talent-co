import { rest } from "msw";

export const handlers = [
  rest.post(
    "http://localhost/undefined/accounts/token/",
    async (req, res, ctx) => {
      const { phone_number, password } = await req.json();

      if (phone_number === "+919675891205" && password === "Aviox@1231254") {
        return res(
          ctx.status(400),
          ctx.json({
            data: null,
            status: "failed",
            message: "Invalid Credentials",
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: {
            id: "24",
            phone_number: "+919675891801",
            email: "",
            access:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NzIwMTYzLCJpYXQiOjE2OTc2MzM3NjMsImp0aSI6IjRiODBlYjU3NDIyZTQ3MDE5OWI4MDVmNTQ3ZjBkZjZiIiwidXNlcl9pZCI6MjR9.Ni8-mFp3IMM7RqGs5AbD-TyAowwf3njOjpqNckFzXJ4",
            refresh:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzcyMDE2MywiaWF0IjoxNjk3NjMzNzYzLCJqdGkiOiJhNWJiMTRkMmI0MjY0M2Q4YTczMDYzMWM5MTFlMTA5MSIsInVzZXJfaWQiOjI0fQ.e9mKkMe1-eO0Cm_Udoe4jVLvaSDfi8Zn0-JQSRDX9n0",
            groups: "Recruiter",
            onMore: "HERE WE HAVE ONE MORE FIELD",
          },
          status: "success",
          message: "Token generated",
        })
      );
    }
  ),

  rest.post(
    "http://localhost/undefined/accounts/register/create-user-otp/",
    async (req, res, ctx) => {
      const { phone_number, password } = await req.json();

      if (phone_number === "+919675891205" && password === "Aviox@1234") {
        return res(
          ctx.status(400),
          ctx.json({
            data: null,
            status: "failed",
            message: "User with this phone number already exists.",
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: {
            id: "24",
            phone_number: "+919675891801",
            email: "",
            access:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NzIwMTYzLCJpYXQiOjE2OTc2MzM3NjMsImp0aSI6IjRiODBlYjU3NDIyZTQ3MDE5OWI4MDVmNTQ3ZjBkZjZiIiwidXNlcl9pZCI6MjR9.Ni8-mFp3IMM7RqGs5AbD-TyAowwf3njOjpqNckFzXJ4",
            refresh:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzcyMDE2MywiaWF0IjoxNjk3NjMzNzYzLCJqdGkiOiJhNWJiMTRkMmI0MjY0M2Q4YTczMDYzMWM5MTFlMTA5MSIsInVzZXJfaWQiOjI0fQ.e9mKkMe1-eO0Cm_Udoe4jVLvaSDfi8Zn0-JQSRDX9n0",
            groups: "Recruiter",
            onMore: "HERE WE HAVE ONE MORE FIELD",
          },
          status: "success",
          message: "Token generated",
        })
      );
    }
  ),

  rest.post(
    "http://localhost/undefined/accounts/forgot-password/",
    async (req, res, ctx) => {
      const { phone_number } = await req.json();

      if (phone_number !== "+919675891801") {
        return res(
          ctx.status(400),
          ctx.json({
            data: null,
            status: "failed",
            message: `Invalid Phone number +91${phone_number}`,
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: null,
          status: "success",
          message: "otp sent successfully",
        })
      );
    }
  ),

  rest.get(
    "http://localhost/undefined/admin/recruiter-job-master/",
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            job_type: [
              {
                id: 1,
                title: "Full Time",
              },
              {
                id: 2,
                title: "Part time",
              },
              {
                id: 3,
                title: "contract based",
              },
            ],
            job_role: [
              {
                id: 1,
                title: "fresher",
              },
              {
                id: 2,
                title: "intermediate",
              },
              {
                id: 3,
                title: "senior",
              },
              {
                id: 4,
                title: "expert",
              },
            ],
            work_experience: [
              {
                id: 1,
                title: "Less than  1 year",
              },
              {
                id: 2,
                title: "1-3 Years",
              },
              {
                id: 3,
                title: "3-5 Years",
              },
              {
                id: 4,
                title: "5+ Years",
              },
            ],
            employment_options: [
              {
                id: 1,
                title: "onsite",
              },
              {
                id: 2,
                title: "hybrid",
              },
              {
                id: 3,
                title: "work from home",
              },
            ],
          },
          status: "success",
          message: "RecruiterJobsMasterView retrieved successfully",
          status_code: 200,
        })
      );
    }
  ),
  rest.get(
    "http://localhost/undefined/recruiters/jobs/?page=1&page_size=10",
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            next: null,
            previous: null,
            count: 5,
            results: [
              {
                id: 2,
                title: "react developer",
                job_type: "Part time",
                job_role: "intermediate",
                about_company: "sd",
                role_details: "sdf",
                culture: "dsf",
                employment_options: [
                  {
                    id: 1,
                    title: "onsite",
                  },
                ],
                experience: "1-3 Years",
                location:
                  "Aviox Technologies Pvt Ltd, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab, India",
                latitude: null,
                longitude: null,
                salary_currency: "Select Type 1",
                salary_range_min: "100",
                salary_range_max: "1000",
                created_by: {
                  id: "4a07a8b8-4155-4e9a-a77f-183958930d5e",
                  user: "ravindra@avioxtechnologies.com",
                  company_name: "",
                  summary: null,
                  values_and_culture: null,
                  website_link: null,
                  linkedin_link: null,
                  company_size: null,
                  revenue_currency_symbol: null,
                  revenue_currency_name: null,
                  revenue_amount: null,
                  revenue_tenure: null,
                  logo: null,
                  banner_img: null,
                  email: "ravindra@avioxtechnologies.com",
                  phone_number: "",
                  created_at: "2023-10-31T04:21:03.406192Z",
                  updated_at: "2023-11-02T04:19:26.393695Z",
                  is_active: true,
                  sectors: [],
                  markets: [],
                  location: [],
                },
                status: "draft",
                closed_at: null,
                similar_jobs: [
                  {
                    id: 1,
                    created_at: "2023-11-01T11:09:26.679404Z",
                    updated_at: "2023-11-01T11:09:26.679463Z",
                    title: "react js",
                    job_type: "Full Time",
                    job_role: "intermediate",
                    about_company: "asd",
                    role_details: "asdf",
                    culture: "asd",
                    experience: "Less than  1 year",
                    location: "Adana, Reşatbey, Seyhan/Adana, Türkiye",
                    latitude: null,
                    longitude: null,
                    salary_currency: "Select Type 1",
                    salary_range_min: "100",
                    salary_range_max: "1000",
                    created_by_id: 2,
                    status: "active",
                    closed_at: null,
                  },
                ],
                skills: [],
                languages: [],
              },
              {
                id: 3,
                title: "Full stack",
                job_type: "Part time",
                job_role: "intermediate",
                about_company: "sda",
                role_details: "should have knowledge of javaScript",
                culture: "ad",
                employment_options: [
                  {
                    id: 1,
                    title: "onsite",
                  },
                  {
                    id: 2,
                    title: "hybrid",
                  },
                ],
                experience: "3-5 Years",
                location:
                  "Net Solutions, Phase - I, Sector 13, Chandigarh, India",
                latitude: null,
                longitude: null,
                salary_currency: "Select Type 1",
                salary_range_min: "100",
                salary_range_max: "1000",
                created_by: {
                  id: "4a07a8b8-4155-4e9a-a77f-183958930d5e",
                  user: "ravindra@avioxtechnologies.com",
                  company_name: "",
                  summary: null,
                  values_and_culture: null,
                  website_link: null,
                  linkedin_link: null,
                  company_size: null,
                  revenue_currency_symbol: null,
                  revenue_currency_name: null,
                  revenue_amount: null,
                  revenue_tenure: null,
                  logo: null,
                  banner_img: null,
                  email: "ravindra@avioxtechnologies.com",
                  phone_number: "",
                  created_at: "2023-10-31T04:21:03.406192Z",
                  updated_at: "2023-11-02T04:19:26.393695Z",
                  is_active: true,
                  sectors: [],
                  markets: [],
                  location: [],
                },
                status: "active",
                closed_at: null,
                similar_jobs: [],
                skills: [],
                languages: [
                  {
                    id: 3,
                    created_at: "2023-11-02T06:11:20.248747Z",
                    updated_at: "2023-11-02T06:11:20.248793Z",
                    is_active: true,
                    title: "English",
                    level: "Label 2",
                    job: 3,
                  },
                ],
              },
              {
                id: 5,
                title: "android",
                job_type: "contract based",
                job_role: "intermediate",
                about_company: "sad",
                role_details: "asd",
                culture: "asd",
                employment_options: [
                  {
                    id: 1,
                    title: "onsite",
                  },
                ],
                experience: "1-3 Years",
                location: "Ashkelon, Israel",
                latitude: null,
                longitude: null,
                salary_currency: "Select Type 3",
                salary_range_min: "100",
                salary_range_max: "1000",
                created_by: {
                  id: "4a07a8b8-4155-4e9a-a77f-183958930d5e",
                  user: "ravindra@avioxtechnologies.com",
                  company_name: "",
                  summary: null,
                  values_and_culture: null,
                  website_link: null,
                  linkedin_link: null,
                  company_size: null,
                  revenue_currency_symbol: null,
                  revenue_currency_name: null,
                  revenue_amount: null,
                  revenue_tenure: null,
                  logo: null,
                  banner_img: null,
                  email: "ravindra@avioxtechnologies.com",
                  phone_number: "",
                  created_at: "2023-10-31T04:21:03.406192Z",
                  updated_at: "2023-11-02T04:19:26.393695Z",
                  is_active: true,
                  sectors: [],
                  markets: [],
                  location: [],
                },
                status: "closed",
                closed_at: "2023-11-02T06:28:16.781102Z",
                similar_jobs: [],
                skills: [],
                languages: [
                  {
                    id: 4,
                    created_at: "2023-11-02T06:28:08.890783Z",
                    updated_at: "2023-11-02T06:28:16.792758Z",
                    is_active: true,
                    title: "French",
                    level: "Label 2",
                    job: 5,
                  },
                ],
              },
            ],
          },
          status: "success",
          message: "Data retrieved successfully",
        })
      );
    }
  ),
];

// http://localhost/undefined/admin/recruiter-job-master/

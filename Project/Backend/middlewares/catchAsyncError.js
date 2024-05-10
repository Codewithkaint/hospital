export const catchAsyncError=(givenFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(givenFunction(req,res,next)).catch(next)
    }
}
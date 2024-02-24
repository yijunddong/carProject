package com.carProject.view.car;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


import com.carProject.biz.car.CarVO;
import com.carProject.biz.car.impl.CarService;
import com.carProject.biz.carcom.CarcomVO;
import com.carProject.biz.carcom.impl.CarcomService;



@Controller
public class carController {
	@Autowired
	private CarService carService;
	@Autowired
	private CarcomService carcomService;

	// 글 등록 접수실
	@RequestMapping(value = "/carListOk.do", method = RequestMethod.POST)
	public String insertCar(CarVO vo, Model model, CarcomVO cvo) {
		System.out.println("접수 완료 ");
		carService.insertCar(vo);		
		return "redirect:/carList.do";
	}

	@RequestMapping(value = "/carList.do")
	public String showCarList(CarVO vo, Model model, CarcomVO cvo) {
		model.addAttribute("carList", carService.getCarList(vo));
		model.addAttribute("carcomList", carcomService.getCarcomList(cvo));
		return "carList.jsp";
	}

	@RequestMapping(value = "/checkOk.do", method = RequestMethod.POST)
	public String checkCar(CarVO vo, Model model, CarcomVO cvo) {		
		System.out.println(" 검사 완료 ");
		carcomService.insertCarcom(cvo);
		carService.deleteCar(vo);
		return "redirect:/check.do";
	}

	@RequestMapping(value = "/check.do")
	public String showCheck(CarVO vo, Model model, CarcomVO cvo) {
		model.addAttribute("carList", carService.getCarList(vo));
		model.addAttribute("carcomList", carcomService.getCarcomList(cvo));
		return "check.jsp";
	}
	
	//출근 
	@RequestMapping("/createTable.do")
	public String createTable(CarVO vo, Model model, CarcomVO cvo) {
	    
	        carService.createCar(vo);
	        carcomService.createCarcom(cvo);   
	        return "redirect:/carList.do";
	   
	}

		
		//퇴근 
		@RequestMapping("/dropTable.do")
		public String dropTable(CarVO vo, Model model,CarcomVO cvo)
		{ 
			carService.dropCar(vo);
	        carcomService.dropCarcom(cvo);
	        return "redirect:/carList.jsp";
		}
		//대기실 
		@RequestMapping("/waiting.do")
		public String getBoardList(CarVO vo, Model model,CarcomVO cvo,HttpSession session) {
			System.out.println("글 목록 검색 처리");
			  //int maxResults = 10; // 표시하고자 하는 최대 결과 수
			  //  vo.setMaxResults(maxResults);
			//    cvo.setMaxResults(maxResults);
					model.addAttribute("carList", carService.getCarList(vo));	
					model.addAttribute("carcomList", carcomService.getCarcomList(cvo));		// Model 정보 저장 
		//	session.setAttribute("boardList", boardService.getBoardList(vo));
	    	//session.setAttribute("carList", carService.getCarList(cvo));
	    	return "waiting.jsp";							
		}
		@RequestMapping("/update.do")
		public String updateCar(CarVO vo)
		{
			carService.updateCar(vo);
			return "redirect:/carList.do";
		}
		
		@RequestMapping("/delete.do")
		public String deleteCar(CarVO vo)
		{
			carService.deleteCar(vo);
			return "redirect:/carList.do";
		}

}

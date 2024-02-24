package com.carProject.biz.carcom.impl;

import java.util.List;


import com.carProject.biz.carcom.CarcomVO;

public interface CarcomService {
	void insertCarcom(CarcomVO vo);
	
	void updateCarcom(CarcomVO vo);
	
	void deleteCarcom(CarcomVO vo);
	
    void createCarcom(CarcomVO vo);
	
	void dropCarcom(CarcomVO vo);
	
	List<CarcomVO> getCarcomList(CarcomVO vo);
	

}
